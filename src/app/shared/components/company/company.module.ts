import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { TextMaskModule } from 'angular2-text-mask';
import { TuiAvatarModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiCheckboxBlockModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/core';

// import { CompanyAddressComponent } from './company-address/company-address.component';
import { CompanyPanelComponent } from './company-panel/company-panel.component';
// import { CompanyUnpComponent } from './company-unp/company-unp.component';
import {
  TuiExpandModule,
  TuiHintModule,
  TuiNotificationModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
// import { CompanyBankComponent } from './company-bank/company-bank.component';
// import { BankModule } from '../bank/bank.module';
import { TuiLetModule } from '@taiga-ui/cdk';
// import { CompanyAddressFieldsComponent } from './company-address-fields/company-address-fields.component';

@NgModule({
  declarations: [
    CompanyPanelComponent,
    // CompanyUnpComponent,
    // CompanyAddressComponent,
    // CompanyBankComponent,
    // CompanyAddressFieldsComponent,
  ],
  imports: [
    // BankModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // TextMaskModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiCheckboxBlockModule,
    TuiExpandModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiTooltipModule,
    TuiInputPhoneModule,
    TuiHintModule,
    TuiErrorModule,
  ],
  exports: [
    CompanyPanelComponent,
    // CompanyUnpComponent,
    // CompanyAddressComponent,
    // CompanyBankComponent,
    // CompanyAddressFieldsComponent,
  ],
})
export class CompanyModule {}
