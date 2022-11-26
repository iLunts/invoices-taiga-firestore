import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Contractor } from '../models/contractor.model';
import { Observable, from } from 'rxjs';
import { ContractorService } from './contractor.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { NotificationService } from './notification.service';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private dbPath = '/contracts';
  private dbPathStatuses = '/contractStatuses';
  contractsRef: AngularFirestoreCollection<Contractor> = null!;
  contractsForContractorsRef: AngularFirestoreCollection<Contractor> = null!;
  contractsForContractorIdRef: AngularFirestoreCollection<Contractor> = null!;

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private contractorService: ContractorService,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.contractsRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }
  }

  getAll$(): Observable<any> {
    return this.contractsRef.valueChanges();
  }

  getAllStatus$(): Observable<any> {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  getAllByContractor(): Observable<any[]> {
    this.contractsForContractorsRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where(
          'contractor.info.unp',
          '==',
          this.contractorService.getContractor().info.unp
        )
        .orderBy('_createdDate', 'desc')
    );
    return this.contractsForContractorsRef.valueChanges();
  }

  getAllByContractorUNP$(contractorUNP: string): Observable<any[]> {
    this.contractsForContractorsRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('contractor.info.unp', '==', contractorUNP)
        .orderBy('_createdDate', 'desc')
    );
    return this.contractsForContractorsRef.valueChanges();
  }

  getAllByContractorId$(contractorId: string): Observable<any[]> {
    const contractsForContractorIdRef = this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('contractor._id', '==', contractorId)
        .orderBy('_createdDate', 'desc')
    );
    return contractsForContractorIdRef.valueChanges();
  }

  add$(contract: any): Observable<any> {
    contract._userId = this.authService.getUserId();
    contract._createdDate = new Date();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(contract._id)
        .set(JSON.parse(JSON.stringify(contract)))
    );
  }

  delete$(_id: string): Observable<any> {
    return from(
      this.contractsRef
        .doc(_id)
        .delete()
        .then(() => this.notificationService.success('Договор успешно удален'))
    );
  }

  update$(_id: string, value: any): Observable<void> {
    return from(
      this.contractsRef
        .doc(_id)
        .update(value)
        .then(() => this.notificationService.success('Договор успешно изменен'))
    );
  }
}
