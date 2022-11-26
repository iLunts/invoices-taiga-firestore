import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule, TuiBadgedContentModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';

import { LeftMenuComponent } from './left-menu.component';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiHintModule,
    TuiScrollbarModule,
  ],
  exports: [LeftMenuComponent],
})
export class LeftMenuModule {}
