import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentalCertificateCreateComponent } from './create/create.component';
import { RentalCertificateListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: RentalCertificateListComponent,
  },
  {
    path: 'create',
    children: [
      {
        path: '',
        component: RentalCertificateCreateComponent,
      },
      {
        path: ':id',
        component: RentalCertificateCreateComponent,
      },
    ],
  },
  {
    path: 'edit/:id',
    component: RentalCertificateCreateComponent,
  },
  {
    path: 'clone',
    component: RentalCertificateCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalCertificateRoutingModule {}
