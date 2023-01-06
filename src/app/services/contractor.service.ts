import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Company, Contractor, ContractorInfo } from '../models/company.model';
import { NotificationService } from './notification.service';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  private dbPath = '/contractors';
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;
  contractorRef: AngularFirestoreCollection<Company> = null!;
  customersExistRef: AngularFirestoreCollection<Company> = null!;
  dbRef: AngularFirestoreCollection<Company> = null!;

  selectedContractor!: Contractor;
  private contractorSubject = new BehaviorSubject<Company>(new Company());
  contractor$: Observable<Company> = this.contractorSubject.asObservable();
  contractors$: Observable<Company[]>;

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.contractorRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }

    this.contractors$ = this.contractorRef.valueChanges();
  }

  getAll$(): Observable<Company[]> {
    return this.contractorRef.valueChanges();
  }

  // getById(id: string): AngularFirestoreCollection<any> {
  getById$(id: string): Observable<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('_id', '==', id)
    );
    return collection.valueChanges();
  }

  checkExistContactorByUNP(unp: string): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .where('info.unp', '==', unp)
      )
      .valueChanges();
  }

  add$(contractor: any): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    contractor._userId = this.authService.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contractor)))
        .then(() => {
          this.notificationService.success('Контрагент успешно создан');
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.contractorRef
        .doc(_id)
        .delete()
        .then(() => {
          this.notificationService.success('Контрагент успешно удалён');
        })
    );
  }

  update$(_id: string, value: any): Observable<any> {
    return of(this.contractorRef.doc(_id).update(value));
  }

  getContractorState$(): Observable<Company> {
    return this.contractor$;
  }

  setContractor(contractor: Company): void {
    this.contractorSubject.next(contractor);
  }

  clearContractor(): void {
    this.setContractor(new Company());
  }

  getContractor(): Company {
    return this.contractorSubject.getValue();
    // if (this.contractor$.getValue()) {
    //   return this.contractor$.getValue();
    // } else {
    //   this.setContractor(new Contractor());
    // }
  }

  isJuridicalAndMailingAddressSame(contractor: Contractor): boolean {
    return _.isEqual(contractor.juridicalAddress, contractor.mailingAddress);
  }

  getAddressToString(
    contractor: Contractor,
    type: 'juridical' | 'mailing' = 'juridical'
  ): string {
    let address = '';
    const typeVar =
      type === 'juridical' ? 'juridicalAddress' : 'mailingAddress';

    address += contractor[typeVar].country
      ? contractor[typeVar].country + ' '
      : '';
    address += contractor[typeVar].zipCode
      ? contractor[typeVar].zipCode + ' '
      : '';
    address += contractor[typeVar].vnsfull
      ? contractor[typeVar].vnsfull + ' '
      : '';
    address += contractor[typeVar].streetType
      ? contractor[typeVar].streetType + ' '
      : '';
    address += contractor[typeVar].street
      ? contractor[typeVar].street + ' '
      : '';
    address += contractor[typeVar].houseNumber
      ? contractor[typeVar].houseNumber + ' '
      : '';
    address += contractor[typeVar].officeType
      ? contractor[typeVar].officeType + ' '
      : '';
    address += contractor[typeVar].office
      ? contractor[typeVar].office + ' '
      : '';

    if (contractor[typeVar]?.email) {
      address += '<br />';

      address += contractor[typeVar]?.email
        ? contractor[typeVar]?.email + ' '
        : '';
    }

    return address;
  }

  getBankInfoToString(contractor: Contractor): string {
    let bankInfo = '';

    bankInfo += contractor.bankAccount.bank.AdrBank
      ? contractor.bankAccount.bank.AdrBank + ' '
      : '';
    bankInfo += contractor.bankAccount.bank.typ
      ? contractor.bankAccount.bank.typ + ' '
      : '';
    bankInfo += contractor.bankAccount.bank.NmBankShort
      ? contractor.bankAccount.bank.NmBankShort + '<br />'
      : '';
    bankInfo += contractor.bankAccount.bank.CDBank
      ? 'БИК (BIC): ' + contractor.bankAccount.bank.CDBank + '<br />'
      : '';
    bankInfo += contractor.bankAccount.SWIFT
      ? 'Р/сч. (SWIFT): ' + contractor.bankAccount.SWIFT
      : '';

    return bankInfo;
  }

  checkContractorValid$(contractor: Company): Observable<boolean> {
    return of(contractor).pipe(
      filter((contractor) => !!contractor),
      switchMap((contractor: Company) =>
        of(
          // this.checkContractorInfoValid(contractor) &&
          this.checkContractorBankValid(contractor) &&
            this.checkContractorSwiftValid(contractor.bankAccount.SWIFT)
        )
      )
    );
  }

  checkContractorInfoValid(contractor: Company): boolean {
    return Object.values(contractor.info).every(
      (info: ContractorInfo) => info !== null
    );
  }

  checkContractorBankValid(contractor: Company): boolean {
    const bank = contractor?.bankAccount?.bank;
    let status = true;

    if (
      !bank ||
      !bank.CDBank ||
      !bank.NmBankShort ||
      !bank.CDHeadBank ||
      !bank.AdrBank ||
      bank.CdControl === 'ЗАКР'
    ) {
      status = false;
    }

    return status;
  }

  checkContractorSwiftValid(swift: string): boolean {
    return this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, ''));
  }
}
