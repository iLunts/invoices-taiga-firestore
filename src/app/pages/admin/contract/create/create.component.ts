import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import {
//   defaultEditorExtensions,
//   tiptapEditorStyles,
//   TUI_EDITOR_EXTENSIONS,
//   // TODO: (Taiga UI migration) TUI_EDITOR_STYLES token has been deleted in 3.0, please use global styles to override default editor styles
//   TUI_EDITOR_STYLES,
// } from '@taiga-ui/addon-editor';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
// import { CONTRACT_TEMPLATE_ALL } from 'src/app/templates/contracts/contract.template';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/utils/date.helper';
import { environment } from 'src/environments/environment';
import { StoreService } from 'src/app/services/store.service';
import { CONTRACT_TEMPLATE_ALL } from 'src/app/templates/contracts/contract.template';
import {
  defaultEditorExtensions,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class ContractCreateComponent implements OnInit, OnDestroy {
  @ViewChild('qrBlock') qrBlock: any;

  private readonly destroySubject = new Subject();
  queryParams: Params = null!;
  stateInProgress = false;
  templateContent = CONTRACT_TEMPLATE_ALL;

  form!: FormGroup;
  withoutNumberControl: FormControl = new FormControl(false);

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private contractorService: ContractorService,
    private companyService: CompanyService,
    private storeService: StoreService
  ) {
    this.initForm();

    this.storeService
      .getContractor$()
      .pipe(
        filter((contractor) => !!contractor),
        distinctUntilChanged(),
        tap((contractor) => this.setContractor(contractor)),
        shareReplay(),
        takeUntil(this.destroySubject)
      )
      .subscribe();

    this.companyService
      .getProfileCompany$()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((company: Company) => {
        this.form.get('profileCompany')?.setValue(company);
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.form?.patchValue({ number: +params['lastIndex'] + 1 });
    });

    this.withoutNumberControl.valueChanges.subscribe((response) => {
      if (response) {
        this.form.get('number')?.disable();
        this.form.get('number')?.setValue(null);
      } else {
        this.form.get('number')?.enable();
        this.form.get('number')?.setValue(+this.queryParams['lastIndex'] + 1);
      }
    });

    this.initQueryParams();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      date: new FormControl(DateHelper.initTuiDay(), [Validators.required]),
      contractor: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      number: new FormControl(+this.queryParams['lastIndex'] || 1, [
        Validators.required,
      ]),
      profileCompany: new FormControl(null, [Validators.required]),
      qrCode: new FormControl(null, [Validators.required]),
      signature: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      type: new FormControl(1, [Validators.required]),
      template: new FormControl(this.templateContent, [Validators.required]),
    });
  }

  initQueryParams(): void {
    if (this.queryParams['contractorId']) {
      this.contractorService
        .getById$(this.queryParams['contractorId'].toString())
        .pipe(takeUntil(this.destroySubject))
        .subscribe((contractor: Contractor[]) => {
          if (contractor.length) {
            this.form.get('contractor')?.setValue(contractor[0]);
          }
        });
    }
  }

  get isContractValid(): boolean {
    return true;
  }

  get isQrCodeValid(): boolean {
    return (
      this.qrBlock && this.qrBlock.qrcElement.nativeElement.childNodes.length
    );
  }

  get getQrCode(): void {
    if (this.isQrCodeValid) {
      return this.qrBlock.qrcElement.nativeElement.childNodes[0].currentSrc;
    } else {
      return null!;
    }
  }

  get f(): any {
    return this.form.controls;
  }

  setStatus(data: any): void {
    if (this.form) {
      this.form.get('status')?.setValue(data);
    }
  }

  setContractor(contractor: Contractor | Company): void {
    if (this.form) {
      this.form.get('contractor')?.setValue(contractor);
      // this.form.controls.contractor.patchValue(contractor);
    }
  }

  // TODO: Need to rewrite this function to actionObservable
  save(): void {
    // TODO: NEED UPDATE INVOICE and set _contractId;
    if (this.isQrCodeValid) {
      this.form.get('qrCode')?.setValue(this.getQrCode);
    }

    this.contractService.add$(this.form.value).subscribe((response) => {
      this.stateInProgress = false;
      this.router.navigate([environment.routing.admin.contract.list]);
    });
  }

  cancel(): void {
    this.router.navigate([environment.routing.admin.contract.list]);
  }
}
