import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';
// import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
// import { TuiActiveZoneModule } from '@taiga-ui/cdk';

import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiNotificationModule,
    TuiAvatarModule
    // TuiSidebarModule,
    // TuiActiveZoneModule
  ],
  exports: [TopMenuComponent]
})
export class TopMenuModule {}
