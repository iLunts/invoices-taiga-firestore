import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Bank } from '../models/bank.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(
    private _http: HttpClient,
    private _notification: NotificationService
  ) {}
  bankInfo = new Bank();

  // getBankByBIC(bic: string): Bank {
  //   let bankInfoSubject = new Subject<Bank>();

  //   this._http.get(`https://www.nbrb.by/api/bic?cdbank=${bic}`).subscribe(
  //     {
  //       next: (response) => {
  //         if (response) {
  //           this.bankInfo = response[0];
  //           if (this.bankInfo.CdControl === 'ЗАКР') {
  //             this._notification.warning('Указанный вами BIC числится в нац. банке под статусом ЗАКРЫТЫЙ. Обратите на это внимание!')
  //           }
  //         }
  //         // bankInfoSubject.next(response[0]);
  //         debugger;
  //         return this.bankInfo;
  //       },
  //       error: () => {
  //         this._notification.error(
  //           'Ошибка при запросе к API в нац. банк',
  //           'Ошибка'
  //         );
  //         debugger;
  //         return this.bankInfo;
  //       },
  //       // complete: () => {
  //       //   bankInfo;
  //       //   debugger;
  //       //   return bankInfo;
  //       // }
  //     }
  //   );

  //   debugger;
  //   return this.bankInfo;
  //   // return bankInfoSubject().value;
  // }

  getBankByBIC$(bic: string): Observable<any> {
    return this._http.get(`https://www.nbrb.by/api/bic?cdbank=${bic}`);
  }

  getAllBank$(): Observable<any> {
    return this._http.get('https://www.nbrb.by/api/bic');
  }
}
