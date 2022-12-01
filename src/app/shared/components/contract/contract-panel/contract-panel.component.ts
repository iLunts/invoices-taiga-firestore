import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Contract } from 'src/app/models/contract.model';
import { Contractor } from 'src/app/models/contractor.model';
import { ContractService } from 'src/app/services/contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-panel',
  templateUrl: './contract-panel.component.html',
  styleUrls: ['./contract-panel.component.less'],
})
export class ContractPanelComponent implements OnInit, OnDestroy {
  @Input() set contractor(value: Contractor) {
    this.contractorSubject.next(value);
    this.form.reset();
  }
  private contractorSubject = new BehaviorSubject<Contractor>(null!);

  @Output() selected = new EventEmitter<Contract>();

  private readonly destroy$ = new Subject();
  contracts$: Observable<Contract[]>;
  form = new FormGroup({
    contract: new FormControl(),
  });
  routing = environment.routing;

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {
    this.contracts$ = this.contractorSubject.pipe(
      filter((contractor) => !!contractor),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((contractor) =>
        this.contractService.getAllByContractorUNP$(contractor.info.unp!)
      ),
      takeUntil(this.destroy$)
    );

    // Preselected contract if list of contracts == 1
    this.contracts$
      .pipe(filter((contracts) => !!contracts && contracts.length == 1))
      .subscribe({
        next: (contracts) => this.form.get('contract')?.setValue(contracts[0]),
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.contractorSubject.complete();
  }

  // fetch(): void {
  //   this.contracts$ = this.contractService
  //     .getAllByContractorUNP$(this.contractor.info.unp)
  //     .pipe(
  //       tap((contracts: Contract[]) => {
  //         if (contracts?.length) {
  //           this.selected.emit(contracts[0]);
  //           this.form.controls.contract.setValue(contracts[0]);
  //         }
  //       }),
  //       takeUntil(this.destroy$)
  //     );
  // }

  openContractCreatePage(): void {
    // TODO: Need add queryParams with selected contractor
    this.router.navigateByUrl(this.routing.admin.contract.create);
  }
}
