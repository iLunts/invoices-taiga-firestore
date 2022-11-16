import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { TuiAvatarModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiActiveZoneModule,
    TuiAlertModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiLetModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiRootModule,
    TuiSidebarModule,
  ],
  exports: [
    TuiActiveZoneModule,
    TuiAlertModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiLetModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiRootModule,
    TuiSidebarModule,
  ],
})
export class TaigaSharedModule {}
