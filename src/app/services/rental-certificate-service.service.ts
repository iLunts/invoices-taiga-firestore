import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';
import { NotificationService } from './notification.service';
import { RentalCertificate } from '../models/rental-certificate.model';
import * as _ from 'lodash';
import { DateHelper } from '../utils/date.helper';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RentalCertificateService {
  private dbPath = '/rentalCertificate';
  rentalCertificateRef: AngularFirestoreCollection<Invoice> = null!;
  rentalCertificateForContractorsRef: AngularFirestoreCollection<Invoice> =
    null!;

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.rentalCertificateRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll$(): Observable<any> {
    return this.rentalCertificateRef.valueChanges();
  }

  getAllByContractorId$(contractorId: string): Observable<any[]> {
    const rentalCertificateRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('contractor._id', '==', contractorId)
        .orderBy('_createdDate', 'desc')
    );
    return rentalCertificateRef.valueChanges();
  }

  getById$(id: string): Observable<RentalCertificate> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('_id', '==', id)
    );

    return collection.valueChanges().pipe(
      first(),
      map((rentalCertificate) => rentalCertificate[0])
    ) as Observable<RentalCertificate>;
  }

  get$(id: string): Observable<any> {
    return this._fs
      .collection(this.dbPath, (q) => q.where('_id', '==', id))
      .valueChanges();
  }

  getAllByContractor$(unp: string): Observable<any[]> {
    this.rentalCertificateForContractorsRef = this._fs.collection(
      this.dbPath,
      (q) =>
        q
          .where('_userId', '==', this.authService.getUserId())
          .where('contractor.info.unp', '==', unp)
          .orderBy('_createdDate', 'desc')
    );
    return this.rentalCertificateForContractorsRef.valueChanges();
  }

  add$(rentalCertificate: RentalCertificate): Observable<any> {
    rentalCertificate._userId = this.authService.getUserId();
    rentalCertificate._createdDate = new Date();
    rentalCertificate.total.totalSum.amount =
      this.calculateTotalAmount(rentalCertificate);

    rentalCertificate.services = DateHelper.convertServicesTuiDayToDate(
      rentalCertificate.services
    );
    rentalCertificate.dateRange = DateHelper.convertDateRangeTuiDayToDate(
      rentalCertificate.dateRange
    );

    return from(
      this._fs
        .collection(this.dbPath)
        .doc(rentalCertificate._id)
        .set(JSON.parse(JSON.stringify(rentalCertificate)))
        .then(() => {
          this.notificationService.success('Справка аренды успешно создана');
          this.router.navigate([
            environment.routing.admin.rentalCertificate.list,
          ]);
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.rentalCertificateRef
        .doc(_id)
        .delete()
        .then(() => {
          this.notificationService.success('Справка аренды успешно удалена');
        })
    );
  }

  update$(_id: string, value: any): Observable<void> {
    return from(this.rentalCertificateRef.doc(_id).update(value));
  }

  calculateTotalAmount(rentalCertificate: RentalCertificate): number {
    return _.sumBy(
      rentalCertificate.services,
      (o) => o.count.amount * o.price.amount
    );
  }
}
