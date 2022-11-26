import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Act } from '../models/act.model';
import { AuthService } from './auth.service';
import { ContractorService } from './contractor.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { DateHelper } from '../utils/date.helper';

@Injectable({
  providedIn: 'root',
})
export class ActService {
  private dbPath = '/acts';
  private dbPathStatuses = '/actStatuses';
  actsRef: AngularFirestoreCollection<Act> = null!;
  actsForContractorsRef: AngularFirestoreCollection<Act> = null!;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _contractor: ContractorService,
    private _notification: NotificationService,
    private _route: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.actsRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll$(): Observable<any> {
    return this.actsRef.valueChanges();
  }

  getAllByContractorId$(contractorId: string): Observable<any[]> {
    const actsRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this._auth.getUserId())
        .where('contractor._id', '==', contractorId)
        .orderBy('_createdDate', 'desc')
    );
    return actsRef.valueChanges();
  }

  getByI$d(id: string): AngularFirestoreCollection<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection;
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
          .where('_userId', '==', this._auth.getUserId())
          .where('_id', '==', statusId)
      )
      .valueChanges();
  }

  // getAllByContractor$(): Observable<any[]> {
  //   this.actsForContractorsRef = this._fs.collection(this.dbPath, (q) =>
  //     q
  //       .where('_userId', '==', this._auth.getUserId())
  //       .where(
  //         'contractor.info.unp',
  //         '==',
  //         this._contractor.getContractor().info.unp
  //       )
  //       .orderBy('_createdDate', 'desc')
  //   );
  //   return this.actsForContractorsRef.valueChanges();
  // }

  add$(act: Act): Observable<any> {
    act._userId = this._auth.getUserId();
    act._createdDate = new Date();
    act.total.totalSum.amount = this.calculateTotalAmount(act);

    act.services = DateHelper.convertServicesTuiDayToDate(act.services);
    act.date = DateHelper.convertTuiDayToDate(act.date);

    return from(
      this._fs
        .collection(this.dbPath)
        .doc(act._id)
        .set(JSON.parse(JSON.stringify(act)))
        .then(() => {
          this._notification.success('Акт успешно создан');
          this._route.navigate([environment.routing.admin.act.list]);
        })
    );
  }

  delete$(_id: string): Observable<void> {
    return from(
      this.actsRef
        .doc(_id)
        .delete()
        .then(() => {
          this._notification.success('Акт успешно удален');
        })
    );
  }

  update$(_id: string, value: any): Observable<void> {
    return from(this.actsRef.doc(_id).update(value));
  }

  calculateTotalAmount(act: Act): number {
    return _.sumBy(act.services, (o) => o.count.amount * o.price.amount);
  }
}
