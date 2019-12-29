import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../http/services/http-helper.service';


export interface PaymentMethod {
  sysId: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  shortName: string;
  cpf: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private httpHelper: HttpHelperService) { }

  public getPaymentMethod() {
    return this.httpHelper.get('/Lookups/GetPaymentMethods');
  }

  public getCustomers() {
    return this.httpHelper.get('/Lookups/GetCustomers');
  }
}
