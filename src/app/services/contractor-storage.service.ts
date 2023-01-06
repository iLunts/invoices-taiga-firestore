import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Company, Contractor } from '../models/company.model';
import { NotificationService } from './notification.service';
import { first, map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContractorStorageService implements OnDestroy {
  private dbPath = '/contractors';
  // private companyRef: AngularFirestoreCollection<Company> = null;
  private readonly destroySubject = new Subject();
  private contractorSubject = new BehaviorSubject<Company>(new Company());
  contractorRef: AngularFirestoreCollection<Company> = null!;
  contractor$: Observable<Company> = this.contractorSubject.asObservable();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.contractorRef = this.afs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  getContractor$(): Observable<Company> {
    return this.contractor$;
  }

  getContractorValue(): Company {
    return this.contractorSubject.getValue();
  }

  setContractor(contractor: Company): void {
    this.contractorSubject.next(contractor);
  }

  // update$(_id: string, company: any): Observable<void> {
  //   return from(
  //     this.afs
  //       .collection(this.dbPath)
  //       .doc(_id)
  //       .update(JSON.parse(JSON.stringify(company)))
  //       .then(() => {
  //         this.notificationService.success('Контрагент успешно создан');
  //       })
  //   );
  // }
}
