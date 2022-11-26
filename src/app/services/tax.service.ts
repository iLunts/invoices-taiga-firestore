import { Injectable } from '@angular/core';
// import {
//   AngularFirestore,
//   AngularFirestoreCollection
// } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Tax } from '../models/tax.model';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private dbPath = '/tax';
  // taxRef: AngularFirestoreCollection<Tax> = null;
  taxRef;

  constructor(
    // private _fs: AngularFirestore,
    private authService: AuthService,
    firestore: Firestore
  ) {
    if (this.authService.isLoggedIn) {
      // this.taxRef = _fs.collection(this.dbPath);
      this.taxRef = collection(firestore, this.dbPath);
    }
  }

  getAll$(): Observable<Tax[]> {
    // return from(this.taxRef.valueChanges());
    return collectionData(this.taxRef);
  }
}
