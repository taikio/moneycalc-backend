import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AgGridHelperService {

  constructor() {
  }

  public currencyFormatter(params) {
    console.log('currency formatter', params);
    return 'R$ ' + (params.value as number).toLocaleString('pt');
  }

  public dateFormatter(params) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(params.value as Date, 'dd/MM/yyyy hh:mm:ss');
  }

  public cpfFormatter(params) {
    let cpf = params.value as string;
    // retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, '');
    // realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
