import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderCreateComponent } from './create/create.component';
import { HeaderListComponent } from './list/list.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [HeaderCreateComponent, HeaderListComponent],
  imports: [CommonModule, TuiButtonModule],
  exports: [HeaderCreateComponent, HeaderListComponent],
})
export class HeaderComponentsModule {}
