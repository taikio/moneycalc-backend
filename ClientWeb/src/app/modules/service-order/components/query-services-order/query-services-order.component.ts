import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ServiceOrderService, ServiceOrder } from '../../services/service-order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/modules/ui/services/loading.service';
import { Subscription, Observable } from 'rxjs';
import { AgGridHelperService } from 'src/app/modules/shared/services/ag-grid-helper.service';
import { NotifyService } from 'src/app/modules/ui/services/notify.service';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ChangeServiceOrderComponent } from '../change-service-order/change-service-order.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-query-services-order',
  templateUrl: './query-services-order.component.html',
  styleUrls: ['./query-services-order.component.scss']
})
export class QueryServicesOrderComponent implements OnInit, OnDestroy {

  constructor(
    private serviceOrderService: ServiceOrderService,
    private fb: FormBuilder,
    private loading: LoadingService,
    private agGridHelper: AgGridHelperService,
    private modalService: NgbModal) {
    this.rowSelection = 'single';
  }

  searchForm: FormGroup;
  subscription: Subscription;
  rowData: Observable<any>;
  showSpinner = false;
  closeResult: string;
  gridApi;
  gridColumnApi;
  selectedRow: ServiceOrder;
  selectedRowsString = 'Teste';
  private rowSelection;

  columnDefs = [
    { headerName: 'ID Ordem', field: '_id', sortable: true, filter: true },
    { headerName: 'Descrição', field: 'description', sortable: true, filter: true },
    { headerName: 'Cliente', field: 'customer.shortName', sortable: true, filter: true },
    { headerName: 'Data', field: 'createdAt', sortable: true, filter: true, valueFormatter: this.agGridHelper.dateFormatter },
    {
      headerName: 'Cancelado?', field: 'isCanceled', sortable: true, filter: true, cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      }
    },
    {
      headerName: 'Dt. Cancelamento', field: 'cancelDate', sortable: true, filter: true, valueFormatter: this.agGridHelper.dateFormatter
    },
    { headerName: 'Valor (R$)', field: 'bill.value', sortable: true, filter: true }
  ];

  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true
  };

  private buildForm() {
    this.searchForm = this.fb.group({
      startDate: ['', [
        Validators.required,
      ]],
      endDate: ['', [
        Validators.required,
      ]],

    });
  }

  search(pesquisarTodos = false) {
    if (!pesquisarTodos && !this.searchForm.valid) {
      Swal.fire('Atenção...', 'Preencha o formulario corretamente!', 'warning');
      return;
    }

    this.loading.showHide(true);

    if (pesquisarTodos) {
      this.rowData = this.serviceOrderService.getAll();
    } else {
      this.rowData = this.serviceOrderService.getByDate(
        this.getStringDateFromNgbDate(this.searchForm.value.startDate as NgbDate),
        this.getStringDateFromNgbDate(this.searchForm.value.endDate as NgbDate));
    }

    this.subscription = this.rowData.subscribe(() => this.loading.showHide(false), (error) => {
      this.loading.showHide(false);
      Swal.fire('Ops..', 'Ocorreu um erro ao buscar as ordens de serviço', 'error');
      console.error(error);
    });
  }

  getStringDateFromNgbDate(ngb: NgbDate) {
    return `${ngb.year}-${ngb.month}-${ngb.day}`;
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  open(type: 'customer' | 'description' | 'cancel') {

    if (!this.selectedRow) {
      Swal.fire('Opps...', 'Nenhum registro selecionado!', 'warning');
      return;
    }

    const modalRef = this.modalService.open(ChangeServiceOrderComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.idServiceOrder = this.selectedRow._id;

    modalRef.result.then(() => {
      if (this.searchForm.valid) {
        this.search();
      } else {
        this.search(true);
      }
    }, () => {
    });
  }


  onRowSelected(event) {
    this.selectedRow = event.data;
  }
}
