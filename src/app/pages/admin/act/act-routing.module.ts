import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ActListComponent,
  },
  {
    path: 'create',
    component: ActCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActRoutingModule {}
