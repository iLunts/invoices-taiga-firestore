import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import * as _ from 'lodash';

import { Contract, ContractStatus } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/models/status.model';
import { StatusHelper } from 'src/app/utils/status.helper';
import { StoreService } from 'src/app/services/store.service';
import { TabItem } from 'src/app/models/tabs.model';
// import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { swallowErrors } from 'src/app/utils/rxjs.helper';
import { Contractor } from 'src/app/models/company.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractListComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly columns = ['number', 'date', 'status', 'dateCreation', 'action'];
  contractStatuses: ContractStatus[] = [];
  isLoaded: boolean = false;
  isViewInit: boolean = false;
  routing = environment.routing;
  selectedContract!: Contract;
  tabs: TabItem[] = [
    {
      name: 'Все',
      disabled: false,
    },
    {
      name: 'Отправленные',
      disabled: true,
    },
    {
      name: 'Подписанные',
      disabled: true,
    },
  ];
  tabActive: TabItem = this.tabs[0];

  private readonly destroy$ = new Subject();
  contracts$!: Observable<Contract[]>;
  contractStatuses$!: Observable<ContractStatus[]>;
  lastIndex$: Observable<Contract>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();
  contractor$: Observable<Contractor>;

  constructor(
    private contractService: ContractService,
    // private templatePdfService: TemplatePdfService,
    private router: Router,
    private storeService: StoreService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.fetch();

    this.contractor$ = this.storeService.getContractor$();

    this.lastIndex$ = this.contracts$.pipe(
      filter((contracts) => !!contracts),
      map((contracts) => _.maxBy(contracts, (c) => c.number) || null!)
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isViewInit = true;
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get getTabActiveIndex(): number {
    return this.tabs.findIndex((item: TabItem) => item === this.tabActive);
  }

  selectTab(activeElement: TabItem): void {
    this.tabActive = activeElement;
  }

  fetch(): void {
    this.contracts$ = this.storeService.getContractor$().pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged(),
      switchMap((contractor) =>
        this.contractService
          .getAllByContractorId$(contractor._id)
          .pipe(swallowErrors())
      ),
      shareReplay()
    );
  }

  openDeleteModal(
    item: Contract,
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.selectedContract = item;
    this.dialogService
      .open(content, {
        label: 'Удаление',
        size: 'm',
        required: false,
        data: item,
      })
      .pipe(indicate(this.indicator$))
      .subscribe({
        next: (data) => {
          this.delete(item);
        },
        complete: () => {},
      });
  }

  delete(item: Contract): void {
    if (item) {
      this.contractService.delete$(item._id);
    }
  }

  downloadPdf(data: Contract): void {
    // this.templatePdfService.downloadPdf('contract', data);
  }

  createBaseOnInvoice(contract: Contract): void {
    this.router.navigate([this.routing.admin.invoice.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id,
      },
    });
  }

  createBaseOnAct(contract: Contract): void {
    this.router.navigate([this.routing.admin.act.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id,
      },
    });
  }

  createBaseOnRentalReference(contract: Contract): void {
    this.router.navigate([this.routing.admin.rentalCertificate.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id,
      },
    });
  }

  getStatusClass(status: Status): string {
    return StatusHelper.getStatusClassName(status);
  }
}
