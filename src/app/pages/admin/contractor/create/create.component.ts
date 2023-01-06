import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { indicate, IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  withLatestFrom,
  takeUntil,
  switchMap,
} from 'rxjs';
import { BankAccount } from 'src/app/models/bank.model';
import { Company, CompanyAddress } from 'src/app/models/company.model';
import { ContractorStorageService } from 'src/app/services/contractor-storage.service';
import { ContractorService } from 'src/app/services/contractor.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  private readonly destroySubject = new Subject();
  private actionChangeContractorInfoSubject = new BehaviorSubject<Company>(
    null!
  );
  private actionChangeBankSubject = new BehaviorSubject<BankAccount>(null!);
  private actionChangeAddressSubject = new BehaviorSubject<Company>(null!);
  private actionSaveSubject = new Subject();

  contractor$: Observable<Company>;
  valid$: Observable<boolean>;
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  isValid!: boolean;

  constructor(
    private contractorService: ContractorService,
    private contractorStorageService: ContractorStorageService
  ) {
    this.contractor$ = this.contractorStorageService.contractor$;

    this.actionChangeContractorInfoSubject
      .pipe(
        filter((company: Company) => !!company),
        withLatestFrom(this.contractor$),
        map(([contractorInfo, contractor]) => ({
          ...contractor,
          _type: contractorInfo._type,
          info: contractorInfo.info,
          juridicalAddress: contractorInfo.juridicalAddress,
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Company) => {
        this.contractorStorageService.setContractor(contractor);
      });

    this.actionChangeBankSubject
      .pipe(
        filter((bank) => !!bank),
        withLatestFrom(this.contractor$),
        map(([bank, contractor]) => ({
          ...contractor,
          bankAccount: bank,
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Company) =>
        this.contractorStorageService.setContractor(contractor)
      );

    this.actionChangeAddressSubject
      .pipe(
        filter((companyAddress: Company) => !!companyAddress),
        withLatestFrom(this.contractor$),
        map(([companyAddress, contractor]) => ({
          ...contractor,
          juridicalAddress: companyAddress.juridicalAddress,
          mailingAddress: companyAddress.mailingAddress,
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Company) =>
        this.contractorStorageService.setContractor(contractor)
      );

    this.valid$ = this.contractor$.pipe(
      switchMap((contractor: Company) =>
        this.contractorService.checkContractorValid$(contractor)
      )
    );

    this.actionSaveSubject
      .pipe(
        indicate(this.indicator$),
        // tap(() => (this.isLoading = true)),
        withLatestFrom(this.contractor$),
        switchMap(([, contractor]) => this.contractorService.add$(contractor)),
        // tap(() => (this.isLoading = false)),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();

    this.actionChangeContractorInfoSubject.complete();
    this.actionChangeBankSubject.complete();
  }

  save(): void {
    this.actionSaveSubject.next(true);
  }

  cancel(): void {
    this.close.emit(true);
  }

  changeCompanyInfo(company: Company): void {
    this.actionChangeContractorInfoSubject.next(company);
  }

  changeBank(bank: BankAccount): void {
    this.actionChangeBankSubject.next(bank);
  }

  changeAddress(company: Company): void {
    this.actionChangeAddressSubject.next(company);
  }

  isSameMailingAddress(contractor: Company): boolean {
    if (_.some(contractor.juridicalAddress, _.isEmpty)) {
      console.log('Same: ', contractor.juridicalAddress);
      return false;
    } else {
      console.log('Compare: ', contractor.juridicalAddress);
      return _.isEqual(contractor.juridicalAddress, contractor.mailingAddress);
    }
  }

  isEmptyAddress(address: CompanyAddress): boolean {
    return _.values(address).every(_.isEmpty);
  }
}
