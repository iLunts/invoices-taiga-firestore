import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from 'src/app/models/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [AuthService, CompanyService],
})
export class DashboardComponent implements OnInit {
  company$!: Observable<Company>;

  constructor(private readonly companyService: CompanyService) {
    this.company$ = this.companyService.company$;
  }

  ngOnInit(): void {}
}
