// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { BehaviorSubject, Subject } from 'rxjs';
// import { filter, takeUntil, tap } from 'rxjs/operators';

// import { Company } from 'src/app/models/company.model';

// @Component({
//   selector: 'app-company-address-fields',
//   templateUrl: './company-address-fields.component.html',
//   styleUrls: ['./company-address-fields.component.less']
// })
// export class CompanyAddressFieldsComponent implements OnInit, OnDestroy {
//   @Input() set company(company: Company) {
//     this.companySubject.next(company);
//   }
//   private companySubject = new BehaviorSubject<Company>(null);

//   private destroySubject = new Subject();
//   form: FormGroup;

//   constructor() {
//     this.initForm();

//     this.companySubject
//       .pipe(
//         filter((company) => !!company),
//         // tap((company) => {
//         //   console.log(company.mailingAddress);
//         // }),
//         takeUntil(this.destroySubject)
//       )
//       .subscribe((company) => this.form.patchValue(company.mailingAddress));
//   }

//   ngOnInit(): void {}

//   ngOnDestroy(): void {
//     this.destroySubject.next(null);
//     this.destroySubject.complete();

//     this.companySubject.complete();
//   }

//   initForm(): void {
//     this.form = new FormGroup({
//       zipCode: new FormControl(null, [Validators.required]),
//       country: new FormControl(null, [Validators.required]),
//       countryType: new FormControl(null),
//       city: new FormControl(null, [Validators.required]),
//       cityType: new FormControl(null),
//       street: new FormControl(null, [Validators.required]),
//       streetType: new FormControl(null),
//       houseNumber: new FormControl(null, [Validators.required]),
//       office: new FormControl(null, [Validators.required]),
//       officeType: new FormControl(null),
//       email: new FormControl(null),
//       phone: new FormControl(null),
//       fax: new FormControl(null),
//       vnsfull: new FormControl(null)
//     });
//   }
// }
