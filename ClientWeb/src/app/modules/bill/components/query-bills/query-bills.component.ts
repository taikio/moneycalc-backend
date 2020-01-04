import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService, Bill } from '../../services/bill.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/modules/ui/services/loading.service';
import { skip } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AgGridHelperService } from 'src/app/modules/shared/services/ag-grid-helper.service';
import { NotifyService } from 'src/app/modules/ui/services/notify.service';
import { NgbDropdownConfig, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ChangeBillComponent } from '../change-bill/change-bill.component';

@Component({
  selector: 'app-query-bills',
  templateUrl: './query-bills.component.html',
  styleUrls: ['./query-bills.component.scss'], providers: [NgbDropdownConfig],
})
export class QueryBillsComponent implements OnInit, OnDestroy {

  constructor(
    private billService: BillService,
    private fb: FormBuilder,
    private loading: LoadingService,
    private agGridHelper: AgGridHelperService,
    private notify: NotifyService,
    private modalService: NgbModal) {
    this.rowSelection = 'single';
  }

  searchForm: FormGroup;
  subscription: Subscription;
  rowData: Observable<any>;
  showSpinner = false;
  datePipe = new DatePipe('en-US');
  selectedRow: Bill;
  private rowSelection;

  columnDefs = [
    { headerName: 'ID Lançamento', field: '_id', sortable: true, filter: true },
    { headerName: 'Meio de Pagamento', field: 'paymentMethod.Description', sortable: true, filter: true },
    { headerName: 'Valor R$', field: 'value', sortable: true, filter: true, valueFormatter: this.agGridHelper.currencyFormatter },
    { headerName: 'Destino', field: 'destiny', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    { headerName: 'Descrição', field: 'description', sortable: true, filter: false },
    {
      headerName: 'Pago?', field: 'paid', sortable: true, filter: true, cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      }
    },
    {
      headerName: 'Dt. Vencimento', field: 'dueDate', sortable: true, filter: true, valueFormatter: this.agGridHelper.dateFormatter
    },
    {
      headerName: 'Dt. Pagamento', field: 'payDay', sortable: true, filter: true, valueFormatter: this.agGridHelper.dateFormatter
    },
    { headerName: 'Dt. Reversão', field: 'reversalDate', sortable: true, filter: true },
    {
      headerName: 'Dt. Cancelamento', field: 'cancelDate', sortable: true, filter: true, valueFormatter: this.agGridHelper.dateFormatter
    }
  ];

  private buildForm() {
    this.searchForm = this.fb.group({
      startDate: ['', [
        Validators.required,
      ]],
      endDate: ['', [
        Validators.required,
      ]],
      destiny: ['', [
        Validators.required,
      ]],
    });
  }

  search() {
    if (!this.searchForm.valid) {
      Swal.fire('Atenção...', 'Preencha o formulario corretamente!', 'warning');
      return;
    }

    this.loading.showHide(true);

    this.rowData = this.billService.getByDate(
      this.getStringDateFromNgbDate(this.searchForm.value.startDate as NgbDate),
      this.getStringDateFromNgbDate(this.searchForm.value.endDate as NgbDate),
      this.searchForm.value.destiny);

    this.subscription = this.rowData.subscribe(() => this.loading.showHide(false), (error) => {
      this.loading.showHide(false);
      Swal.fire('Opps...', 'Ocorreu um erro ao buscar os lançamento financeiros', 'error');
      console.error(error);
    });
  }

  open(type: 'payment' | 'duedate' | 'value' | 'cancel' | 'pay') {

    if (!this.selectedRow) {
      Swal.fire('Opps...', 'Nenhum registro selecionado!', 'warning');
      return;
    }

    const modalRef = this.modalService.open(ChangeBillComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.idBill = this.selectedRow._id;

    modalRef.result.then(() => {
      this.search();
    }, () => {
    });
  }

  getStringDateFromNgbDate(ngb: NgbDate){
    return `${ngb.year}-${ngb.month}-${ngb.day}`;
  }

  onRowSelected(event) {
    this.selectedRow = event.data;
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
