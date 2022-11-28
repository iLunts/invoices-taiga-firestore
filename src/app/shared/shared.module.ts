import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EmptyModule } from './components/empty/empty.module';
import { FluidHeightDirective } from './directives/fluid-height.directive';
import { StateInProgressDirective } from './directives/state-in-progress.directive';

@NgModule({
  declarations: [StateInProgressDirective, FluidHeightDirective],
  imports: [
    CommonModule,
    // ComponentsModule,
    EmptyModule,
    FormsModule,
    // QRCodeModule,
    ReactiveFormsModule,
    // TaigaModule,
    // TextMaskModule,
    // TopMenuModule,
  ],
  exports: [
    CommonModule,
    // ComponentsModule,
    EmptyModule,
    FormsModule,
    // QRCodeModule,
    ReactiveFormsModule,
    // StateInProgressDirective,
    // FluidHeightDirective,
    // TaigaModule,
    // TextMaskModule,
    // TopMenuModule,
  ],
})
export class SharedModule {}
