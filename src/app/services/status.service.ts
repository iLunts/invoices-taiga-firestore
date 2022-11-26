import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private dbPath = '/statuses';

  constructor(private fs: AngularFirestore) {}

  getAll$(type: string): Observable<Status[]> {
    return this.fs
      .collection('/statuses', (q) =>
        q.where('type', 'array-contains', type).orderBy('order')
      )
      .valueChanges() as Observable<Status[]>;
  }
}
