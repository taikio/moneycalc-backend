import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  SharedModule
} from '../shared/shared.module';
import {
  NgbDropdownModule, NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';

import { FormServiceOrderComponent } from './components/form-service-order/form-service-order.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QueryServicesOrderComponent } from './components/query-services-order/query-services-order.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChangeServiceOrderComponent } from './components/change-service-order/change-service-order.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'new',
    component: FormServiceOrderComponent
  },
  {
    path: 'query',
    component: QueryServicesOrderComponent
  }]
}];

@NgModule({
  declarations: [
    FormServiceOrderComponent,
    QueryServicesOrderComponent,
    ChangeServiceOrderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    NgbDropdownModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([]),
    NgbModule,
    NgxCurrencyModule
  ],
  entryComponents: [ChangeServiceOrderComponent],
  exports: [RouterModule, ChangeServiceOrderComponent]
})
export class ServiceOrderModule { }
