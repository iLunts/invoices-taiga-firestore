import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
// import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
// import { SharedModule } from 'src/app/shared/shared.module';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputDateRangeModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule,
  TuiInputFilesModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule,
  TuiHintModule,
  TuiDataListModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { SharedModule } from 'src/app/shared/shared.module';
// import { HeaderModule } from '../components/header/header.module';
// import { BreadcrumbsModule } from 'src/app/shared/components/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [
    // InvoicesCreateComponent,
    InvoicesListComponent,
  ],
  imports: [
    // BreadcrumbsModule,
    CommonModule,
    // ContractorModule,
    // HeaderModule,
    SharedModule,
    InvoicesRoutingModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiDataListModule,
    TuiFormatNumberPipeModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiInputDateRangeModule,
    TuiInputFilesModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiScrollbarModule,
    TuiTableModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiActiveZoneModule,
    TuiSvgModule,
  ],
})
export class InvoicesModule {}
