import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiHostedDropdownModule,
  TuiNotificationModule,
  TuiScrollbarModule,
  TuiHintModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule,
  TuiInputFilesModule,
} from '@taiga-ui/kit';
// import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
// import { ContractModule } from 'src/app/shared/components/contract/contract.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [ActCreateComponent, ActListComponent],
  imports: [
    ActRoutingModule,
    CommonModule,
    // ContractModule,
    ContractorModule,
    // HeaderModule,
    SharedModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputFilesModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiScrollbarModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiNotificationModule,
    TuiTableModule,
    TuiSvgModule,
  ],
  exports: [ActCreateComponent, ActListComponent],
})
export class ActModule {}
