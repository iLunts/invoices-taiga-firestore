import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';

// import { ContractModule } from 'src/app/shared/components/contract/contract.module';
import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { TaigaSharedModule } from 'src/app/shared/taiga-shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { StatusModule } from 'src/app/shared/components/status/status.module';
import { CompanyModule } from 'src/app/shared/components/company/company.module';
import { ContractComponentsModule } from 'src/app/shared/components/contract/contract.module';

@NgModule({
  declarations: [ActCreateComponent, ActListComponent],
  imports: [
    // ContractModule,
    ActRoutingModule,
    CommonModule,
    CompanyModule,
    ComponentsModule,
    ContractorModule,
    SharedModule,
    StatusModule,
    TaigaSharedModule,
    ContractComponentsModule,
  ],
  exports: [ActCreateComponent, ActListComponent],
})
export class ActModule {}
