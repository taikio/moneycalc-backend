import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LookupService } from 'src/app/modules/lookup/services/lookup.service';
import { ServiceOrderService } from '../../services/service-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-service-order',
  templateUrl: './change-service-order.component.html',
  styleUrls: ['./change-service-order.component.scss']
})
export class ChangeServiceOrderComponent implements OnInit {

  @Input() type: 'description' | 'customer' | 'cancel';
  @Input() idServiceOrder: string;

  customers: Observable<any>;

  customerId: string;
  description: string;

  constructor(
    private lookup: LookupService,
    public activeModal: NgbActiveModal,
    public serviceOrderService: ServiceOrderService,
  ) { }

  save() {
    if (this.type === 'customer' && this.customerId) {
      this.serviceOrderService.changeCustomer(this.idServiceOrder, this.customerId).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Cliente alterado com sucesso!', 'success');
          this.activeModal.close();
        },
        (error) => {
          Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao alterar o cliente!', 'error');
          console.log('Falha ao alterar a ordem de serviço', error);
        }
      );
    } else if (this.description) {
      this.serviceOrderService.changeDescription(this.idServiceOrder, this.description).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Descrição alterada com sucesso!', 'success');
          this.activeModal.close();
        },
        (error) => {
          Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao alterar a descrição!', 'error');
          console.log('Falha ao alterar a ordem de serviço', error);
        }
      );
    } else {
      Swal.fire('Atenção...', 'Preencha o campo corretamente!', 'warning');
    }
  }

  cancel() {
    this.serviceOrderService.cancel(this.idServiceOrder).subscribe(
      (sucess) => {
        Swal.fire('Sucesso...', 'Ordem de serviço cancelada com sucesso!', 'success');
        this.activeModal.close();
      },
      (error) => {
        Swal.fire('Opps...', error.error ? error.error : 'Ocorreu uma falha ao cancelar a ordem de serviço!', 'error');
        console.log('Falha ao cancelar a ordem de serviço', error);
      }
    );
  }

  ngOnInit() {
    if (this.type === 'customer') {
      this.customers = this.lookup.getCustomers();
    }
  }

}
