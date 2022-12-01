import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractListComponent,
  },
  {
    path: 'create',
    component: ContractCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
