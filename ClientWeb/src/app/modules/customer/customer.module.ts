import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { QueryCustomersComponent } from './components/query-customers/query-customers.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChangeCustomerComponent } from './components/change-customer/change-customer.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'new',
    component: FormCustomerComponent
  },
  {
    path: 'query',
    component: QueryCustomersComponent
  }]
}];

@NgModule({
  declarations: [
    FormCustomerComponent,
    QueryCustomersComponent,
    ChangeCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
    NgbDropdownModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [ChangeCustomerComponent]
})
export class CustomerModule { }
