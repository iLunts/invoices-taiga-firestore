import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import {
  Company,
  CompanyAddress,
  CompanyInfo,
  ResponsiblePerson,
} from '../models/company.model';
import { NotificationService } from './notification.service';
import { Bank, BankAccount } from '../models/bank.model';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  shareReplay,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { merge } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CompanyService implements OnDestroy {
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null!;
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;
  private companySubject = new BehaviorSubject<Company>(new Company());
  private readonly destroySubject = new Subject();
  // company$: Observable<Company> = this.companySubject.asObservable();
  company$!: Observable<Company>;
  companies$!: Observable<any[]>;
  company!: Company;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      console.log('Call constructor CompanyService');

      this.company$ = this.afs
        .collection(this.dbPath, (q) =>
          q.where('_userId', '==', this.authService.getUserId())
        )
        .valueChanges()
        .pipe(
          first(),
          map((company: any[]) => company[0] || null),
          shareReplay()
        );

      // TODO: Нужно проверить будут ли меняться данные, при повторном вызове сервиса в конструкторе другого компонента
      // const company$ = this.getProfileCompany$();

      // company$
      //   .pipe(
      //     filter((company: Company) => !!company),
      //     tap((company: Company) => this.companySubject.next(company)),
      //     takeUntil(this.destroySubject)
      //   )
      //   .subscribe();
    } else {
      this.clearCompanyFromLocalStorage();
    }
  }

  getCompanies$(): Observable<Company[]> {
    return this.companies$;
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  checkCompanyValid(company: Company): boolean {
    if (company) {
      // return (
      //   this.checkCompanyInfoValid(company) &&
      //   this.checkCompanyBankValid(company) &&
      //   this.checkCompanySwiftValid(company.bankAccount.SWIFT)
      // );
      return true;
    } else {
      return false;
    }
  }

  checkCompanyValid$(company: Company): Observable<boolean> {
    return merge(
      this.checkCompanyInfoValid$(company),
      this.checkCompanyBankAccountValid$(company)
    );
  }

  checkCompanyInfoValid(company: Company): boolean {
    return Object.values(company.info).every(
      (info: CompanyInfo) => info !== null
    );
  }

  checkCompanyInfoValid$(company: Company): Observable<boolean> {
    return of(
      Object.values(company.info).every((info: CompanyInfo) => info !== null)
    );
  }

  checkCompanyBankValid$(company: Company): Observable<boolean> {
    const bank = company?.bankAccount?.bank;
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
    return of(status);
  }

  checkCompanySwiftValid$(swift: string): Observable<boolean> {
    return of(this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, '')));
  }

  checkCompanyBankAccountValid$(company: Company): Observable<boolean> {
    return merge(
      this.checkCompanyBankValid$(company),
      this.checkCompanySwiftValid$(company?.bankAccount?.SWIFT)
    );
  }

  setCompany$(company: Company): void {
    this.companySubject.next(company);
  }

  setCompany(company: Company): void {
    this.company = company;
  }

  getCompany(): Company {
    // TODO: Need rewrite to Observable !!!
    // if (this.companySubject.getValue()) {
    //   return this.companySubject.getValue();
    // } else {
    //   this.setCompany(new Company());
    // }
    if (!this.companySubject.getValue()) {
      this.setCompany(new Company());
    }
    return this.companySubject.getValue();
  }

  getCompanyData$(): Observable<Company> {
    const companyRef: AngularFirestoreCollection<Company> = this.afs.collection(
      this.dbPath,
      (q) => q.where('_userId', '==', this.authService.getUserId())
    );

    return companyRef.valueChanges().pipe(
      first(),
      map((company: Company[]) => company[0])
    ) as Observable<Company>;

    // const company$ = companyRef.valueChanges().pipe(
    //   first(),
    //   map(([company]) => company),
    //   distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    //   tap((company: Company) => {
    //     this.companySubject.next(company);
    //     this.setCompanyToLocalStorage(company);
    //   }),
    //   // shareReplay()
    //   takeUntil(this.destroySubject)
    // );

    // return company$;
  }

  getCompany$(): Observable<Company> {
    return this.company$;
  }

  getCompanyValue(): Company {
    return this.companySubject.getValue();
  }

  getProfileCompany$(): Observable<Company> {
    const companyRef: AngularFirestoreCollection<Company> = this.afs.collection(
      this.dbPath,
      (q) => q.where('_userId', '==', this.authService.getUserId())
    );

    // const company$ = companyRef.valueChanges().pipe(
    return companyRef.valueChanges().pipe(
      first(),
      map(([company]) => company),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((company: Company) => {
        this.companySubject.next(company);
        this.setCompanyToLocalStorage(company);
      }),
      shareReplay()
    );
  }

  clearCompanyInfo(): void {
    let company = this.getCompany();

    company.info = new CompanyInfo();
    company.juridicalAddress = new CompanyAddress();
    company.ved = null!;
    company._type = null!;

    this.setCompany(company);
  }

  clearCompanyBankAccount(): void {
    const company$ = this.getCompany$();
    company$
      .pipe(
        filter((company) => !!company),
        distinctUntilChanged(),
        map((company: Company) => ({
          ...company,
          bankAccount: new BankAccount(),
        })),
        tap((company) => {
          this.setCompany(company);
        }),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  clearCompanyBank(): void {
    // TODO: нужно сделать merge() и уже внутри rxjs обновлять конкретные данные и прослушивать все изменения
    let company = this.getCompany();

    company.bankAccount.bank = new Bank();

    this.setCompany(company);

    // this.actionClearCompanyBankSubject.next(null);
  }

  clearCompanySwift(): void {
    let company = this.getCompany();
    company.bankAccount.SWIFT = null!;

    this.setCompany(company);
  }

  clearMailingAddress(): void {
    const company = this.getCompany();

    company.mailingAddress = new CompanyAddress();

    this.setCompany(company);
  }

  clearCompany(): void {
    this.setCompany(new Company());
  }

  add$(company: Company): Observable<any> {
    if (!company._id) {
      company._id = this.afs.createId();
    }
    company._userId = this.authService.getUserId();
    company._createdDate = new Date().toString();

    return from(
      this.afs
        .collection(this.dbPath)
        .doc(company._id)
        .set(JSON.parse(JSON.stringify(company)))
        .then(() => {
          this.notificationService.success('Компания успешно добавлена');
        })
    );
  }

  update$(_id: string, company: any): Observable<void> {
    return from(
      this.afs
        .collection(this.dbPath)
        .doc(_id)
        .update(company)
        .then(() => {
          this.notificationService.success('Компания успешно обнавлена');
        })
    );
  }

  update(): Observable<any> {
    return from(
      this.afs
        .collection(this.dbPath)
        .doc(this.company._id!)
        .update(this.company)
        .then(() => {
          this.notificationService.success('Компания успешно обнавлена');
        })
    );
  }

  updateResponsiblePerson(responsiblePerson: ResponsiblePerson): void {
    // const company$ = this.company$.pipe(
    this.company$
      .pipe(
        map((company: Company) => ({
          ...company,
          responsiblePerson,
        })),
        tap((company: Company) => {
          // this.setCompany(company);
        }),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) => this.setCompany(company));

    // company$.subscribe((data) => {
    //   debugger;
    // });

    // return company$;
  }

  isJuridicalAndPostalAddressSame(company: Company): boolean {
    return _.isEqual(company.juridicalAddress, company.mailingAddress);
  }

  get isCompanyNotEmpty(): boolean {
    const company = JSON.parse(localStorage.getItem('company')!) || null;
    return company !== null ? true : false;
  }

  setCompanyToLocalStorage(company?: Company): void {
    localStorage.setItem(
      'company',
      company
        ? JSON.stringify(company)
        : JSON.stringify(this.companySubject.getValue())
    );
  }

  setCompanyToLocalStorage$(company?: Company): Observable<Company> {
    this.clearCompanyFromLocalStorage();
    localStorage.setItem(
      'company',
      company
        ? JSON.stringify(company)
        : JSON.stringify(this.companySubject.getValue())
    );

    return of(company!);
  }

  getCompanyFromLocalStorage(): Company {
    let company;
    try {
      company = JSON.parse(localStorage.getItem('company')!);
    } catch (error) {
      this.clearCompany();
    }
    return !!company ? company : null;
  }

  clearCompanyFromLocalStorage(): void {
    localStorage.removeItem('company');
  }
}
