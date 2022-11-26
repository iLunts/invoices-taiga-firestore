import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Tax } from '../models/tax.model';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private dbPath = '/tax';
  taxRef: AngularFirestoreCollection<Tax> = null!;

  constructor(private fs: AngularFirestore, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.taxRef = fs.collection(this.dbPath);
    }
  }

  getAll$(): Observable<Tax[]> {
    return from(this.taxRef.valueChanges()) as Observable<Tax[]>;
  }
}
