import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Currency } from '../models/price.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private dbPath = '/currency';
  currencyRef: AngularFirestoreCollection<Currency> = null!;

  constructor(private _fs: AngularFirestore, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.currencyRef = _fs.collection(this.dbPath);
    }
  }

  getAll$(): Observable<Currency[]> {
    return from(this.currencyRef.valueChanges());
  }
}
