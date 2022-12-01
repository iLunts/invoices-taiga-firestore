import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Company, CompanyInfo } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPanelComponent implements OnInit {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null!);
  company$: Observable<Company> = this.companySubject.asObservable().pipe(
    filter((company) => !!company),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );
  private actionCompanySubject = new BehaviorSubject<Company>(null!);
  private readonly destroySubject = new Subject();

  @Input() isLoaded: boolean = false;
  @Input() canChange: boolean = false;
  @Output() onChange = new EventEmitter<Company>();

  constructor() {
    this.actionCompanySubject
      .pipe(
        filter((company: Company) => !!company),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) => this.onChange.emit(company));
  }

  ngOnInit(): void {}

  clearCompanyUnp(): void {
    this.actionCompanySubject.next(new Company());
  }
}
