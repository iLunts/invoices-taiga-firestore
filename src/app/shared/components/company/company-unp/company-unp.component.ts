// import {
//   ChangeDetectionStrategy,
//   Component,
//   EventEmitter,
//   Input,
//   OnDestroy,
//   OnInit,
//   Output
// } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   filter,
//   switchMap,
//   takeUntil,
//   tap
// } from 'rxjs/operators';
// import { Company } from 'src/app/models/company.model';

// import { CompanyService } from 'src/app/services/company.service';
// import { EgrService } from 'src/app/services/egr.service';

// @Component({
//   selector: 'app-company-unp',
//   templateUrl: './company-unp.component.html',
//   styleUrls: ['./company-unp.component.less'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class CompanyUnpComponent implements OnInit, OnDestroy {
//   @Input() set company(company: Company) {
//     this.companySubject.next(company);
//   }
//   private companySubject = new BehaviorSubject<Company>(null);
//   company$: Observable<Company> = this.companySubject.asObservable();

//   @Input() canChange: boolean;

//   @Output() onChange = new EventEmitter<Company>();

//   isValidCompany: boolean;
//   unpControl: FormControl = new FormControl('', [
//     Validators.required,
//     Validators.minLength(9),
//     Validators.maxLength(9)
//   ]);
//   destroySubject: ReplaySubject<any> = new ReplaySubject<any>(1);

//   constructor(
//     private egrService: EgrService,
//     private companyService: CompanyService
//   ) {
//     this.unpControl.valueChanges
//       .pipe(
//         filter(() => this.unpControl.valid),
//         debounceTime(400),
//         distinctUntilChanged(),
//         switchMap((unp: string) => this.egrService.getAllByUnp$(unp)),
//         takeUntil(this.destroySubject)
//       )
//       .subscribe((company: Company) => {
//         this.companySubject.next(company);
//         this.setCompany(company);
//       });
//   }

//   ngOnInit(): void {}

//   ngOnDestroy(): void {
//     this.destroySubject.next(null);
//     this.destroySubject.complete();
//   }

//   clearCompanyInfo(): void {
//     this.unpControl.setValue(null);
//     this.companyService.clearCompanyInfo();
//   }

//   setCompany(company: Company): void {
//     this.onChange.emit(company);
//   }
// }
