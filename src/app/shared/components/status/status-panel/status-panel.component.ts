import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';

import { Status } from 'src/app/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { swallowErrors } from 'src/app/utils/rxjs.helper';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.less'],
})
export class StatusPanelComponent implements OnInit, OnDestroy {
  @Input() set type(value: string) {
    this.typeSubject.next(value);
  }
  private typeSubject = new ReplaySubject<string>(1);
  type$ = this.typeSubject.asObservable();

  @Input() set status(value: Status) {
    if (value) {
      this.statusSubject.next(value);
    }
  }
  private statusSubject = new ReplaySubject<Status>(1);
  status$: Observable<Status> = this.statusSubject.asObservable();

  @Output() changed = new EventEmitter<Status>();

  statuses$: Observable<Status[]>;
  statusControl = new FormControl();

  private readonly destroySubject = new Subject();

  constructor(private statusesService: StatusService) {
    // TODO: Need to check twiceCall
    this.statuses$ = this.type$.pipe(
      filter((type: string) => !!type),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((type: string) =>
        this.statusesService.getAll$(type).pipe(swallowErrors())
      )
    );

    this.statuses$
      .pipe(
        filter(() => !this.statusControl.value),
        takeUntil(this.destroySubject)
      )
      .subscribe((statuses) => {
        this.selectStatus(statuses[0]);
      });

    this.statusSubject
      .pipe(
        filter((status) => !!status),
        tap((status) => {
          this.statusControl.patchValue(status);
        }),
        takeUntil(this.destroySubject)
      )
      .subscribe();

    combineLatest([this.statuses$, this.status$])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(([, status]) => {
        this.statusControl.patchValue(status);
      });

    this.statusControl.valueChanges
      .pipe(
        filter((value) => !!value),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroySubject)
      )
      .subscribe((value) => {
        this.changed.emit(value!);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  selectStatus(status: Status): void {
    this.statusControl.setValue(status);
    this.changed.emit(status);
  }
}
