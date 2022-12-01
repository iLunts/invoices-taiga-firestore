import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LeftMenuModule } from './components/left-menu/left-menu.module';
import { StatusModule } from 'src/app/shared/components/status/status.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, LeftMenuModule, StatusModule],
})
export class AdminModule {}
