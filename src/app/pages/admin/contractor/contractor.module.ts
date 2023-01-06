import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';
import { ContractorRoutingModule } from './contractor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaigaSharedModule } from 'src/app/shared/taiga-shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [ContractorListComponent, ContractorCreateComponent],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    SharedModule,
    TaigaSharedModule,
    ComponentsModule,
  ],
  exports: [ContractorListComponent, ContractorCreateComponent],
})
export class ContractorModule {}
