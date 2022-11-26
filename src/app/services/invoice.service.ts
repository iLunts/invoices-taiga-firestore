import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Invoice } from '../models/invoice.model';
import { AuthService } from './auth.service';
import { ContractorService } from './contractor.service';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { DateHelper } from '../utils/date.helper';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dbPath = '/invoices';
  private dbPathStatuses = '/invoiceStatuses';
  invoicesRef: AngularFirestoreCollection<Invoice> = null!;
  invoicesForContractorsRef: AngularFirestoreCollection<Invoice> = null!;

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private contractorService: ContractorService,
    private notificationService: NotificationService,
    private _route: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.invoicesRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll$(): Observable<Invoice[]> {
    return this.invoicesRef
      .valueChanges()
      .pipe(tap((data) => console.log(data)));
  }

  getAllByContractorId$(contractorId: string): Observable<any[]> {
    const invoicesRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('contractor._id', '==', contractorId)
        .orderBy('_createdDate', 'desc')
    );
    return invoicesRef.valueChanges();
  }

  getById$(id: string): Observable<Invoice> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('_id', '==', id)
    );
    return collection.valueChanges().pipe(
      first(),
      map((service) => service[0])
    ) as Observable<Invoice>;
  }

  get$(id: string): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) => q.where('_id', '==', id))
      .valueChanges();
  }

  getAllStatus$(): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  getAllByStatus$(statusId: string): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .where('_id', '==', statusId)
      )
      .valueChanges();
  }

  getAllByContractor$(): Observable<any[]> {
    this.invoicesForContractorsRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where(
          'contractor.info.unp',
          '==',
          this.contractorService.getContractor().info.unp
        )
        .orderBy('_createdDate', 'desc')
    );
    return this.invoicesForContractorsRef.valueChanges();
  }

  add$(invoice: Invoice): Observable<any> {
    invoice._userId = this.authService.getUserId();
    invoice._createdDate = new Date();
    invoice.total.totalSum.amount = this.calculateTotalAmount(invoice);

    invoice.services = DateHelper.convertServicesTuiDayToDate(invoice.services);
    invoice.dateRange = DateHelper.convertDateRangeTuiDayToDate(
      invoice.dateRange
    );

    return from(
      this._fs
        .collection(this.dbPath)
        .doc(invoice._id!)
        .set(JSON.parse(JSON.stringify(invoice)))
        .then(() => {
          this.notificationService.success('Счет успешно создан');
          this._route.navigate([environment.routing.admin.invoice.list]);
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.invoicesRef
        .doc(_id)
        .delete()
        .then(() => {
          this.notificationService.success('Счет успешно удален');
        })
    );
  }

  update$(_id: string, value: any): Observable<void> {
    return from(this.invoicesRef.doc(_id).update(value));
  }

  calculateTotalAmount(invoice: Invoice): number {
    return _.sumBy(invoice.services, (o) => o.count.amount * o.price.amount);
  }
}
