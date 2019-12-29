import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSigninComponent } from './modules/auth/components/auth-signin/auth-signin.component';
import { AdminComponent } from './modules/ui/components/admin/admin.component';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { DashAnalyticsComponent } from './modules/dashboard/components/dash-analytics.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashAnalyticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'service-order',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/service-order/service-order.module').then(module => module.ServiceOrderModule)
      },
      {
        path: 'bill',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/bill/bill.module').then(module => module.BillModule)
      },
      {
        path: 'customer',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/customer/customer.module').then(module => module.CustomerModule)
      }
    ],
  },
  {
    path: '',
    component: AuthSigninComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
