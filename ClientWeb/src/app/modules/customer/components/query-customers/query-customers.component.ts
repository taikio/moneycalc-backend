import { ChangeCustomerComponent } from './../change-customer/change-customer.component';
import { Customer } from './../../services/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LoadingService } from 'src/app/modules/ui/services/loading.service';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AgGridHelperService } from 'src/app/modules/shared/services/ag-grid-helper.service';
import { NotifyService } from 'src/app/modules/ui/services/notify.service';
import Swal from 'sweetalert2';
import { NgbDropdownConfig, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-query-customers',
  templateUrl: './query-customers.component.html',
  styleUrls: ['./query-customers.component.scss'], providers: [NgbDropdownConfig]
})
export class QueryCustomersComponent implements OnInit, OnDestroy {

  constructor(
    private customerService: CustomerService,
    private loading: LoadingService,
    private agGridHelper: AgGridHelperService,
    private notify: NotifyService,
    private modalService: NgbModal
    ) {
      this.rowSelection = 'single';
     }

  subscription: Subscription;
  rowData: Observable<any>;
  showSpinner = false;
  selectedRow: Customer;
  rowSelection;

  columnDefs = [
    { headerName: 'ID Cliente', field: '_id', sortable: true, filter: true },
    { headerName: 'Nome', field: 'name', sortable: true, filter: true },
    { headerName: 'Nome Abreviado', field: 'shortName', sortable: true, filter: true }
    // { headerName: 'CPF', field: 'cpf', sortable: true, filter: true, valueFormatter: this.agGridHelper.cpfFormatter },
    // { headerName: 'Email', field: 'email', sortable: true, filter: true },
  ];

  getCustomers() {
    this.loading.showHide(true);
    this.rowData = this.customerService.getCustomers();
    this.subscription = this.rowData.subscribe(() => this.loading.showHide(false), (error) => {
      this.loading.showHide(false);
      Swal.fire('Opps...', 'Ocorreu um erro ao buscar os clientes', 'error');
      console.error(error);
    });
  }

  open(type: 'name' | 'shortname' | 'cpf' | 'cancel') {

    if (!this.selectedRow) {
      Swal.fire('Opps...', 'Nenhum registro selecionado!', 'warning');
      return;
    }
    console.log('edit', this.selectedRow._id);
    const modalRef = this.modalService.open(ChangeCustomerComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.idCustomer = this.selectedRow._id;

    modalRef.result.then(() => {
      this.getCustomers();
    }, () => {
    });
  }

  onRowSelected(event) {
    this.selectedRow = event.data;
  }

  ngOnInit() {
    this.getCustomers();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
