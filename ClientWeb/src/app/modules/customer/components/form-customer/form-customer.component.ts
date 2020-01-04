import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerService, NewCustomerDto } from '../../services/customer.service';
import { LookupService } from 'src/app/modules/lookup/services/lookup.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit, OnDestroy {

  customerForm: FormGroup;
  subscriptions: Array<Subscription>;

  constructor(
    private lookup: LookupService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
    ) {
      this.subscriptions = new Array<Subscription>();
  }

  private buildForm() {
    this.customerForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      shortName: ['', [
        Validators.required,
      ]]
      // cpf: ['', [
      //   Validators.required,
      //   Validators.pattern('[0-9]{11}')
      // ]],
      // email: ['', [
      //   Validators.email
      // ]],
    });
  }

  submmit(continueForm: boolean = false) {
    if (!this.customerForm.valid) {
      Swal.fire('Atenção...', 'Preencha todos os campos do formulario!', 'warning');
      return;
    }

    const newCustomer = this.customerForm.value as NewCustomerDto;

    this.subscriptions.push(
      this.customerService.newCustomer(newCustomer).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Cliente cadastrado com sucesso', 'success');
          if (!continueForm) {
            return this.router.navigate(['/dashboard']);
          }
          this.customerForm.reset();
        }
      )
    );

  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
