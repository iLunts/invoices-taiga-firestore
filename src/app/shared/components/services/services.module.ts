import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTableComponent } from './service-table/service-table.component';
import { TaigaSharedModule } from '../../taiga-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServiceTableComponent],
  imports: [CommonModule, TaigaSharedModule, FormsModule, ReactiveFormsModule],
  exports: [ServiceTableComponent],
})
export class ServicesModule {}
