import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContractorAsideLayoutComponent } from './contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { TopMenuModule } from '../shared/components/top-menu/top-menu.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LeftMenuModule } from '../pages/admin/components/left-menu/left-menu.module';
import { ContractorModule } from '../shared/components/contractor/contractor.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    ContractorAsideLayoutComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TopMenuModule,
    TuiScrollbarModule,
    LeftMenuModule,
    ContractorModule,
  ],
  exports: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    ContractorAsideLayoutComponent,
    DefaultLayoutComponent,
  ],
})
export class LayoutsModule {}
