import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../http/services/http-helper.service';
import { HttpParams } from '@angular/common/http';
import { Customer } from '../../lookup/services/lookup.service';
import { Bill } from '../../bill/services/bill.service';
import { Observable } from 'rxjs';

export interface ServiceOrder {
  _id: string;
  description: string;
  customer: Customer;
  bill: Bill;
  date: Date;
  cancelDate: Date;
  isCanceled: boolean;
}

export interface NewServiceOrderDto {
  description: string;
  customerId: string;
  paymentMethodSysId: string;
  value: number;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {

  constructor(private httpHelper: HttpHelperService) { }

  public newServiceOrder(order: NewServiceOrderDto) {
    return this.httpHelper.post('/api/ServiceOrders/New', order);
  }

  public cancel(id: string) {
    return this.httpHelper.post(`/api/ServiceOrders/Cancel/${id}`, null);
  }

  public getAll(): Observable<ServiceOrder> {
    return this.httpHelper.get('/api/ServiceOrders/GetList') as Observable<ServiceOrder>;
  }

  public getByDate(startDate: string, endDate: string): Observable<ServiceOrder> {
    return this.httpHelper.get('/api/ServiceOrders/GetByDate', {
      startDate,
      endDate,
    }) as Observable<ServiceOrder>;
  }

  public changeCustomer(id: string, customerId: string) {
    return this.httpHelper.put(`/api/ServiceOrders/Customer`, {
      id, 
      customerId
    });
  }

  public changeDescription(id: string, description: string) {
    return this.httpHelper.put(`/api/ServiceOrders/Description`, {
      id, 
      description
    });
  }
}
