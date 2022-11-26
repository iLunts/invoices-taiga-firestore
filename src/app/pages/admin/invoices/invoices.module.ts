import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
// import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
// import { SharedModule } from 'src/app/shared/shared.module';
// import {
//   TuiAvatarModule,
//   TuiBadgeModule,
//   TuiInputDateRangeModule,
//   TuiInputInlineModule,
//   TuiInputNumberModule,
//   TuiTabsModule,
//   TuiTextAreaModule,
//   TuiInputFilesModule,
// } from '@taiga-ui/kit';
// import {
//   TuiButtonModule,
//   TuiFormatNumberPipeModule,
//   TuiHostedDropdownModule,
//   TuiScrollbarModule,
//   TuiHintModule,
// } from '@taiga-ui/core';
// import { TuiLetModule } from '@taiga-ui/cdk';
// import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
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
    InvoicesRoutingModule,
    // SharedModule,
    // TuiAvatarModule,
    // TuiBadgeModule,
    // TuiButtonModule,
    // TuiCurrencyPipeModule,
    // TuiFormatNumberPipeModule,
    // TuiHintModule,
    // TuiHostedDropdownModule,
    // TuiInputDateRangeModule,
    // TuiInputFilesModule,
    // TuiInputInlineModule,
    // TuiInputNumberModule,
    // TuiLetModule,
    // TuiTabsModule,
    // TuiTextAreaModule,
    // TuiScrollbarModule,
  ],
})
export class InvoicesModule {}
