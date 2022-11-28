import { Component, Inject, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
// import { CompanyService } from 'src/app/services/company_FIREBASE_NEW.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less'],
  providers: [TuiDestroyService],
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    @Inject(TuiDestroyService) destroy$: TuiDestroyService,
    private companyService: CompanyService
  ) {
    this.companyService
      .getProfileCompany$()
      .pipe(
        filter((company) => !!company),
        switchMap((company) =>
          this.companyService.setCompanyToLocalStorage$(company)
        ),
        takeUntil(destroy$)
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
