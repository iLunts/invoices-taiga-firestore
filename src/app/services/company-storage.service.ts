import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Company } from '../models/company.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyStorageService implements OnDestroy {
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null!;
  private readonly destroySubject = new Subject();
  private companySubject = new BehaviorSubject<Company>(new Company());
  company$: Observable<Company> = this.companySubject.asObservable();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    // if (this.authService.isLoggedIn) {
    //   this.afs
    //     .collection(this.dbPath, (q) =>
    //       q.where('_userId', '==', this.authService.getUserId())
    //     )
    //     .valueChanges()
    //     .pipe(
    //       first(),
    //       map((company: Company[]) => company[0]),
    //       filter((company) => !!company),
    //       takeUntil(this.destroySubject)
    //     )
    //     .subscribe((company: Company) => this.companySubject.next(company));
    // }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  getCompany$(): Observable<Company> {
    return this.company$;
  }

  getCompanyValue(): Company {
    return this.companySubject.getValue();
  }

  setCompany(company: Company): void {
    this.companySubject.next(company);
  }

  add$(company: Company): Observable<void> {
    company._id = this.afs.createId();
    company._userId = this.authService.getUserId();

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

  update$(company: Company): Observable<void> {
    return from(
      this.afs
        .collection(this.dbPath)
        .doc(company._id!)
        .update(JSON.parse(JSON.stringify(company)))
        .then(() => {
          this.notificationService.success('Компания успешно обнавлена');
        })
    );
  }

  checkResponsiblePersonValid$(company: Company): Observable<boolean> {
    return of(company).pipe(
      filter((company: Company) => !!company && !!company.responsiblePerson),
      map((company: Company) => !_.some(company.responsiblePerson, _.isEmpty)),
      distinctUntilChanged()
    );
  }
}
