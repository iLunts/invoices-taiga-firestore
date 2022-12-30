import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as _ from 'lodash';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Invoice, InvoiceStatus, TotalSum } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Service } from 'src/app/models/service.model';
import { StoreService } from 'src/app/services/store.service';
import { swallowErrors } from 'src/app/utils/rxjs.helper';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;

  private readonly destroySubject = new Subject();
  form!: FormGroup;
  initDay = DateHelper.initTuiDay();
  isEdit: boolean = false;
  isEditingNumber: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private router: Router,
    private storeService: StoreService,
    private fb: FormBuilder
  ) {
    this.initForm();

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((company: Company) => {
        this.form.get('profileCompany')?.setValue(company);
      });

    this.storeService
      .getContractor$()
      .pipe(
        filter((contractor) => !!contractor),
        tap((contractor) => this.form.get('contractor')?.setValue(contractor)),
        takeUntil(this.destroySubject),
        shareReplay()
      )
      .subscribe();

    this.activatedRoute.paramMap
      .pipe(
        map((params: any) => params.params),
        filter((params) => params.id),
        switchMap((params) =>
          this.invoiceService.getById$(params.id).pipe(swallowErrors())
        ),
        filter((invoice) => !!invoice),
        takeUntil(this.destroySubject)
      )
      .subscribe((invoice: Invoice) => {
        this.setForm(invoice);
        this.isEdit = true;
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.form?.patchValue({
        number: params > ['lastIndex'] ? +params['lastIndex'] + 1 : 1,
      });
    });

    this.activatedRoute.queryParams
      .pipe(
        filter((params) => !!params['cloneId']),
        switchMap((params) =>
          this.invoiceService.getById$(params['cloneId']).pipe(swallowErrors())
        ),
        withLatestFrom(this.activatedRoute.queryParams)
      )
      .subscribe(([invoice, params]) => {
        invoice._id = this.afs.createId();
        this.setForm(invoice);
        this.form?.patchValue({
          number: params['lastIndex'] ? +params['lastIndex'] + 1 : 1,
        });
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      _id: this.fb.control(this.afs.createId(), [Validators.required]),
      _contractId: this.fb.control(null),
      contractor: this.fb.control(null, [Validators.required]),
      dateRange: this.fb.control(DateHelper.initTuiDayRange(6), [
        Validators.required,
      ]),
      description: this.fb.control(null),
      number: this.fb.control(1, [Validators.required]),
      profileCompany: this.fb.control(null, [Validators.required]),
      qrCode: this.fb.control(null),
      services: this.fb.control(null, [Validators.required]),
      signature: this.fb.control(null),
      status: this.fb.control(null, [Validators.required]),
      total: this.fb.control(new TotalSum(), [Validators.required]),
      type: this.fb.control(1, [Validators.required]),
    });
  }

  get f(): any {
    return this.form.controls;
  }

  setStatus(data: InvoiceStatus | any): void {
    this.form.get('status')?.setValue(data);
  }

  setContractor(data: Contractor): void {
    this.form.get('contractor')?.setValue(data);
  }

  setService(data: Service[]): void {
    this.form.get('services')?.patchValue(data);
    this.form.get('services')?.markAsDirty();
  }

  save(): void {
    if (this.isQrCodeValid) {
      this.form.get('qrCode')?.setValue(this.getQrCode);
    }
    this.invoiceService.add$(this.form.value).subscribe(() => {
      this.router.navigate([environment.routing.admin.invoice.list]);
    });
  }

  setForm(invoice: Invoice): void {
    invoice.dateRange = DateHelper.convertDateRangeToTuiDayRange(
      invoice.dateRange!
    );
    this.form.patchValue(invoice);
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.invoice.list]);
  }

  get getQrCode(): any {
    if (this.isQrCodeValid) {
      return this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    } else {
      return null;
    }
  }

  get isQrCodeValid(): boolean {
    return (
      this.qrBlock && this.qrBlock.qrcElement.nativeElement.childNodes.length
    );
  }

  onFocusedChange(focused: boolean): void {
    if (!focused) {
      this.isEditingNumber = false;
    }
  }
}
