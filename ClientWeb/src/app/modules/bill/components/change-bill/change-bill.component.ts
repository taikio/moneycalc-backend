import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupService } from 'src/app/modules/lookup/services/lookup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { BillService } from '../../services/bill.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-bill',
  templateUrl: './change-bill.component.html',
  styleUrls: ['./change-bill.component.scss']
})
export class ChangeBillComponent implements OnInit {

  @Input() type: 'payment' | 'duedate' | 'value' | 'cancel' | 'pay';
  @Input() idBill: string;

  customers: Observable<any>;

  paymentId: string;
  dueDate: NgbDate;
  value: number;

  constructor(
    private lookup: LookupService,
    public activeModal: NgbActiveModal,
    public billService: BillService,
  ) { }

  save() {
    
    if (this.type === 'payment' && this.value) {
      this.billService.changePaymentMethod(this.idBill, this.paymentId).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Meio de pagamento alterado com sucesso!', 'success');
          this.activeModal.close();
        },
        (error) => {
          Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao alterar o meio de pagamento!', 'error');
          console.log('Falha ao cadastrar o lançamento', error);
        }
      );
    } else if (this.type === 'duedate' && this.dueDate) {

      const formattedDate: string = this.getStringDateFromNgbDate(this.dueDate);

      this.billService.changeDueDate(this.idBill, formattedDate).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Data de vencimento alterada com sucesso!', 'success');
          this.activeModal.close();
        },
        (error) => {
          // Swal.fire('Opps...', 'Ocorreu uma falha ao alterar a data de vencimento!', 'error');
          // Swal.fire({type: 'error', title: 'Oops...', text: 'Falha ao alterar a data de vencimento'});
          console.log('Falha ao cadastrar o lançamento');
          this.activeModal.close();
        }
      );
    } else if (this.type === 'value' && this.value) {
      this.billService.changeValue(this.idBill, this.value).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Valor alterado com sucesso!', 'success');
          this.activeModal.close();
        },
        (error) => {
          Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao alterar o valor!', 'error');
          console.log('Falha ao cadastrar o lançamento', error);
        }
      );
    } else {
      Swal.fire('Atenção...', 'Preencha o campo corretamente!', 'warning');
    }
  }

  cancel() {
    this.billService.cancel(this.idBill).subscribe(
      (sucess) => {
        Swal.fire('Sucesso...', 'Lançamento cancelado com sucesso!', 'success');
        this.activeModal.close();
      },
      (error) => {
        Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao cancelar o lançamento!', 'error');
        console.log('Falha ao falha ao cancelar o lançamento', error);
      }
    );
  }

  pay() {
    this.billService.makeRetirement(this.idBill).subscribe(
      (sucess) => {
        Swal.fire('Sucesso...', 'Lançamento baixado com sucesso!', 'success');
        this.activeModal.close();
      },
      (error) => {
        Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao baixar o lançamento!', 'error');
        console.log('Falha ao baixar o lançamento', error);
      }
    );
  }

  getStringDateFromNgbDate(ngb: NgbDate) {
    return `${ngb.year}-${ngb.month}-${ngb.day}`;
  }

  ngOnInit() {
    // const today = new Date(Date.now());
    // this.dueDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDay());

    if (this.type === 'payment') {
      this.customers = this.lookup.getCustomers();
    }
  }
}
