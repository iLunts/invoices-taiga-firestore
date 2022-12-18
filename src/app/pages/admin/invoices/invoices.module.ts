import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaigaSharedModule } from 'src/app/shared/taiga-shared.module';
import { InvoicesCreateComponent } from './create/create.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { StatusModule } from 'src/app/shared/components/status/status.module';
import { CompanyModule } from 'src/app/shared/components/company/company.module';
import { ServicesModule } from 'src/app/shared/components/services/services.module';
// import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
// import { HeaderModule } from '../components/header/header.module';
// import { BreadcrumbsModule } from 'src/app/shared/components/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [InvoicesCreateComponent, InvoicesListComponent],
  imports: [
    // BreadcrumbsModule,
    // ContractorModule,
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    TaigaSharedModule,
    ComponentsModule,
    StatusModule,
    ServicesModule,
    CompanyModule,
  ],
})
export class InvoicesModule {}
