import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorListComponent,
  },
  {
    path: 'create',
    component: ContractorCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorRoutingModule {}
