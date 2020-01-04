import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../http/services/http-helper.service';

export interface NewCustomerDto {
  name: string;
  shortName: string;
  // cpf: string;
  // email: string;
}

export interface Customer {
  _id: string;
  name: string;
  shortName: string;
  cpf: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpHelper: HttpHelperService) { }

  public newCustomer(customer: NewCustomerDto) {
    return this.httpHelper.post('/api/Customers/', customer);
  }

  public getCustomers() {
    return this.httpHelper.get('/api/Lookups/GetCustomers');
  }

  public changeName(id: string, name: string) {
    return this.httpHelper.put('/api/Customers/Name/', { id, name });
  }

  public changeShortname(id: string, shortName: string) {
    return this.httpHelper.put('/api/Customers/Shortname/', { id, shortName });
  }

  public changeCpf(id: string, cpf: string) {
    return this.httpHelper.put('/api/Customers/Cpf/', { id, cpf });
  }

  public cancel(id: string) {
    return this.httpHelper.post(`/api/Customers/Cancel/${id}`, null);
  }
}
