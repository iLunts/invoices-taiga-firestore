import { Component, OnInit } from '@angular/core';
import { IndicatorBehaviorSubject } from 'ngx-ready-set-go';
import { Company, Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractorListComponent implements OnInit {
  indicator$: IndicatorBehaviorSubject = new IndicatorBehaviorSubject();

  readonly columns = ['unp', 'name', 'action'];
  routing = environment.routing;
  isOpenAsideContractorView!: boolean;

  constructor(
    private contractorService: ContractorService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {}

  toggleAsideContractorView(contractor: Company): void {
    this.isOpenAsideContractorView = !this.isOpenAsideContractorView;
    this.contractorService.setContractor(contractor);
  }
}
