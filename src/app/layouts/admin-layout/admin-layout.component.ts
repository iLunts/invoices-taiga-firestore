import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
// import { CompanyService } from 'src/app/services/company_FIREBASE_NEW.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less'],
})
export class AdminLayoutComponent implements OnInit {
  constructor() {
    // this.companyService
    //   .getProfileCompany$()
    //   .pipe(
    //     filter((company) => !!company),
    //     switchMap((company) =>
    //       this.companyService.setCompanyToLocalStorage$(company)
    //     )
    //   )
    //   .subscribe();
  }

  ngOnInit(): void {}
}
