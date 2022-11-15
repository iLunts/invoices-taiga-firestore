import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContractorAsideLayoutComponent } from './contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { TopMenuModule } from '../shared/components/top-menu/top-menu.module';

@NgModule({
  declarations: [
    // AdminLayoutComponent,
    ContractorAsideLayoutComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [CommonModule, RouterModule, TopMenuModule, TuiScrollbarModule],
  exports: [
    // AdminLayoutComponent,
    AuthLayoutComponent,
    ContractorAsideLayoutComponent,
    DefaultLayoutComponent
  ]
})
export class LayoutsModule {}
