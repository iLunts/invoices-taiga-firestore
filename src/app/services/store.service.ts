import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Contractor } from '../models/company.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private contractorSubject = new BehaviorSubject<Contractor>(null!);
  contractor$ = this.contractorSubject.asObservable();

  constructor() {}

  setContractor(contractor: Contractor): void {
    this.contractorSubject.next(contractor);
  }

  getContractor$(): Observable<Contractor> {
    return this.contractor$.pipe(
      distinctUntilChanged((a, b) => _.isEqual(a, b))
    );
  }

  getSelectedContractorId(): string {
    return this.contractorSubject.getValue()?._id || null!;
  }
}
