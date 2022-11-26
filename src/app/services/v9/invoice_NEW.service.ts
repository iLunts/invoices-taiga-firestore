import { Observable, of, shareReplay, Subject } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collectionData,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

import { Invoice } from '../models/invoice.model';
import { addDoc, collection, doc } from 'firebase/firestore';
import { AuthService } from './auth.service';
// import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dbPath = '/invoices';
  private dbPathStatuses = '/invoiceStatuses';

  private invoicesSubject = new Subject<Invoice[]>();

  invoices$: Observable<Invoice[]> = this.invoicesSubject.asObservable();

  constructor(
    // @Optional() private authService: AuthService,
    private firestore: Firestore
  ) {
    // this.invoices$ = this.getAll$();
    this.getAll();
  }

  add$(invoice: Invoice): Observable<any> {
    invoice._id = doc(collection(this.firestore, 'id')).id;

    return of(addDoc(collection(this.firestore, this.dbPath), invoice));
  }

  // async getAll$(): Observable<Invoice[]> {
  async getAll() {
    // const _userId = this.authService.getUserId();
    const _userId = JSON.parse(localStorage.getItem('_userId')!) || null;
    const ref = collection(this.firestore, this.dbPath);

    const q = query(ref, where('_userId', '==', _userId));
    const querySnapshot = await getDocs(q);

    const arr: Invoice[] = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data() as Invoice);
    });

    this.invoicesSubject.next(arr);
  }
}
