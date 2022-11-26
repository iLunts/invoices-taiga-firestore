// import { Injectable } from '@angular/core';
// // import {
// //   AngularFirestore,
// //   AngularFirestoreCollection
// // } from '@angular/fire/firestore';
// import { from, Observable } from 'rxjs';

// import { AuthService } from './auth.service';
// import { Unit } from '../models/unit.model';
// import { collection, Firestore } from '@angular/fire/firestore';
// import { collectionData } from 'rxfire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class UnitService {
//   private dbPath = '/units';
//   // unitRef: AngularFirestoreCollection<Unit> = null;
//   unitRef;

//   constructor(
//     // private _fs: AngularFirestore,
//     private authService: AuthService,
//     firestore: Firestore
//   ) {
//     if (this.authService.isLoggedIn) {
//       // this.unitRef = _fs.collection(this.dbPath);
//       this.unitRef = collection(firestore, this.dbPath);
//     }
//   }

//   getAll$(): Observable<Unit[]> {
//     // return from(this.unitRef.valueChanges());
//     return collectionData(this.unitRef);
//   }
// }
