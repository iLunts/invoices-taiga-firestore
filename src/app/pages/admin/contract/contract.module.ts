import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';
import { ContractRoutingModule } from './contract-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaigaSharedModule } from 'src/app/shared/taiga-shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [ContractCreateComponent, ContractListComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    // ContractorModule,
    SharedModule,
    TaigaSharedModule,
    ComponentsModule,
  ],
})
export class ContractModule {}
