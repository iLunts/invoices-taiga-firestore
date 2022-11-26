import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private dbPath = '/units';
  unitRef: AngularFirestoreCollection<Unit> = null!;

  constructor(private fs: AngularFirestore, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.unitRef = fs.collection(this.dbPath);
    }
  }

  getAll$(): Observable<Unit[]> {
    return from(this.unitRef.valueChanges());
  }
}
