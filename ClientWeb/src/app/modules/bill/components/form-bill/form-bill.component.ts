import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LookupService } from 'src/app/modules/lookup/services/lookup.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BillService, NewBillDto } from '../../services/bill.service';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.scss']
})
export class FormBillComponent implements OnInit, OnDestroy {

  billForm: FormGroup;
  paymentMethods: Observable<any>;
  subscriptions: Array<Subscription>;

  constructor(
    private lookup: LookupService,
    private fb: FormBuilder,
    private billService: BillService,
    private router: Router
    ) {
      this.subscriptions = new Array<Subscription>();
  }

  private buildForm() {
    this.billForm = this.fb.group({
      paymentMethodSysId: ['', [
        Validators.required,
      ]],
      value: ['', [
        Validators.required,
      ]],
      destiny: ['', [
        Validators.required,
      ]],
      dueDate: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]]
    });
  }

  submmit(continueForm: boolean = false) {
    if (!this.billForm.valid) {
      Swal.fire('Atenção...', 'Preencha todos os campos do formulario!', 'warning');
      return;
    }

    const newService = this.billForm.value as NewBillDto;
    console.log('bill form value', this.billForm.value)
    newService.dueDate = this.getStringDateFromNgbDate(this.billForm.value.dueDate);

    this.subscriptions.push(
      this.billService.new(newService).subscribe(
        (sucess) => {
          Swal.fire('Sucesso...', 'Lançamento cadastrado com sucesso', 'success');
          if (!continueForm) {
            return this.router.navigate(['/dashboard']);
          }
          this.billForm.reset();
        }
      )
    );

  }

  getStringDateFromNgbDate(ngb: NgbDate){
    return `${ngb.year}-${ngb.month}-${ngb.day}`;
  }

  ngOnInit() {
    this.buildForm();
    this.paymentMethods = this.lookup.getPaymentMethod();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
