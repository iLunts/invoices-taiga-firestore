import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalCertificateCreateComponent } from './create/create.component';
import { RentalCertificateListComponent } from './list/list.component';
import { HeaderComponentsModule } from 'src/app/shared/components/header/header.module';
import { TaigaSharedModule } from 'src/app/shared/taiga-shared.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RentalCertificateRoutingModule } from './rental-certificate-routing.module';
import { StatusModule } from 'src/app/shared/components/status/status.module';
import { CompanyModule } from 'src/app/shared/components/company/company.module';
import { ContractComponentsModule } from 'src/app/shared/components/contract/contract.module';

@NgModule({
  declarations: [
    RentalCertificateCreateComponent,
    RentalCertificateListComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponentsModule,
    RentalCertificateRoutingModule,
    SharedModule,
    StatusModule,
    TaigaSharedModule,
    CompanyModule,
    ContractComponentsModule,
  ],
})
export class RentalCertificateModule {}
