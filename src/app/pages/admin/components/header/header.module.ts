import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderCreateComponent } from './create/create.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [HeaderCreateComponent],
  imports: [CommonModule, TuiButtonModule],
  exports: [HeaderCreateComponent],
})
export class HeaderModule {}
