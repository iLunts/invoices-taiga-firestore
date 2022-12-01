import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  TuiDataListModule,
  TuiExpandModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractPanelComponent } from './contract-panel/contract-panel.component';

@NgModule({
  declarations: [ContractPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiNotificationModule,
    TuiExpandModule,
    TuiLinkModule,
  ],
  exports: [ContractPanelComponent],
})
export class ContractComponentsModule {}
