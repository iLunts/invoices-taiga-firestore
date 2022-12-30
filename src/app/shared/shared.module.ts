import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { EmptyModule } from './components/empty/empty.module';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { StateInProgressDirective } from './directives/state-in-progress.directive';

@NgModule({
  declarations: [StateInProgressDirective, FluidHeightDirective],
  imports: [
    // ComponentsModule,
    // TaigaModule,
    // TextMaskModule,
    // TopMenuModule,
    CommonModule,
    EmptyModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
  ],
  exports: [
    // ComponentsModule,
    FluidHeightDirective,
    // StateInProgressDirective,
    // TaigaModule,
    // TextMaskModule,
    // TopMenuModule,
    CommonModule,
    EmptyModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
