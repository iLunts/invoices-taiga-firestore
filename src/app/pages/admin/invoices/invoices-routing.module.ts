import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesListComponent,
  },
  {
    path: 'create',
    children: [
      {
        path: '',
        component: InvoicesCreateComponent,
      },
      {
        path: ':id',
        component: InvoicesCreateComponent,
      },
    ],
  },
  {
    path: 'edit/:id',
    component: InvoicesCreateComponent,
  },
  {
    path: 'clone',
    component: InvoicesCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
