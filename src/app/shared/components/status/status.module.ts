import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusPanelComponent } from './status-panel/status-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiDataListModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [StatusPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
  ],
  exports: [StatusPanelComponent],
})
export class StatusModule {}
