import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaigaSharedModule } from '../../taiga-shared.module';

import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [CommonModule, RouterModule, TaigaSharedModule],
  exports: [TopMenuComponent],
})
export class TopMenuModule {}
