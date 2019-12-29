import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LookupService } from 'src/app/modules/lookup/services/lookup.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'change-customer',
  templateUrl: './change-customer.component.html',
  styleUrls: ['./change-customer.component.scss']
})
export class ChangeCustomerComponent implements OnInit {

  @Input() type: 'name' | 'shortname' | 'cpf' | 'cancel';
  @Input() idCustomer: string;

  name = '';
  shortname = '';
  cpf = '';

  constructor(
    private lookup: LookupService,
    public activeModal: NgbActiveModal,
    public customerService: CustomerService,
  ) { }

  save() {
    if (this.type === 'name' && this.name.length > 0) {
      console.log('change name', this.idCustomer);
      this.customerService.changeName(this.idCustomer, this.name).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Nome alterado com sucesso!', 'success');
          this.activeModal.close();
        }
      );
    } else if (this.type === 'shortname' && this.shortname.length > 0) {
      this.customerService.changeShortname(this.idCustomer, this.shortname).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Nome Abreviado alterado com sucesso!', 'success');
          this.activeModal.close();
        }
      );
    } else if (this.type === 'cpf' && this.shortname.length > 0) {
      this.customerService.changeCpf(this.idCustomer, this.shortname).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Cpf alterado com sucesso!', 'success');
          this.activeModal.close();
        }
      );
    }
  }

  cancel() {
    this.customerService.cancel(this.idCustomer).subscribe(
      (sucess) => {
        Swal.fire('Sucesso...', 'Cliente excluído com sucesso!', 'success');
        this.activeModal.close();
      }
    );
  }

  ngOnInit() {
    
  }

}
