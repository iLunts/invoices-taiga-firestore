import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

import { EmptyPanelComponent } from './empty-panel/empty-panel.component';

@NgModule({
  declarations: [EmptyPanelComponent],
  imports: [CommonModule, TuiButtonModule, RouterModule],
  exports: [EmptyPanelComponent]
})
export class EmptyModule {}
