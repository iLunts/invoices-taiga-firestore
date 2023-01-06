import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CompanyGuard } from 'src/app/guards/company.guard';

import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from 'src/app/layouts/contractor-aside-layout/contractor-aside-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ContractorAsideLayoutComponent,
        children: [
          {
            path: 'invoices',
            loadChildren: () =>
              import('./invoices/invoices.module').then(
                (m) => m.InvoicesModule
              ),
            canActivate: [AuthGuard, CompanyGuard],
          },
          {
            path: 'contract',
            loadChildren: () =>
              import('./contract/contract.module').then(
                (m) => m.ContractModule
              ),
            canActivate: [AuthGuard, CompanyGuard],
          },
          {
            path: 'contractor',
            loadChildren: () =>
              import('./contractor/contractor.module').then(
                (m) => m.ContractorModule
              ),
            canActivate: [AuthGuard, CompanyGuard],
          },
          {
            path: 'act',
            loadChildren: () =>
              import('./act/act.module').then((m) => m.ActModule),
            canActivate: [AuthGuard, CompanyGuard],
          },
          {
            path: 'rental-certificate',
            loadChildren: () =>
              import('./rental-certificate/rental-certificate.module').then(
                (m) => m.RentalCertificateModule
              ),
            canActivate: [AuthGuard, CompanyGuard],
          },
        ],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        // canActivate: [AuthGuard],
      },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./settings/settings.module').then((m) => m.SettingsModule),
      //   canActivate: [AuthGuard],
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
