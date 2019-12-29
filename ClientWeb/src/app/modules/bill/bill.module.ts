import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBillComponent } from './components/form-bill/form-bill.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QueryBillsComponent } from './components/query-bills/query-bills.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule, NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { ChangeBillComponent } from './components/change-bill/change-bill.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'new',
    component: FormBillComponent
  },
  {
    path: 'query',
    component: QueryBillsComponent
  }]
}];

@NgModule({
  declarations: [
    FormBillComponent,
    QueryBillsComponent,
    ChangeBillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgGridModule.withComponents([]),
    NgbModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxCurrencyModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [ChangeBillComponent]
})
export class BillModule { }
