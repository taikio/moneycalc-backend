import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../http/services/http-helper.service';
import { HttpParams } from '@angular/common/http';
import { Customer } from '../../lookup/services/lookup.service';
import { Bill } from '../../bill/services/bill.service';
import { Observable } from 'rxjs';

export interface ServiceOrder {
  id: string;
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
    return this.httpHelper.post('/ServiceOrders/New', order);
  }

  public cancel(id: string) {
    return this.httpHelper.post(`/ServiceOrders/Cancel/${id}`, null);
  }

  public getAll(): Observable<ServiceOrder> {
    return this.httpHelper.get('/ServiceOrders/GetList') as Observable<ServiceOrder>;
  }

  public getByDate(startDate: string, endDate: string): Observable<ServiceOrder> {
    return this.httpHelper.get('/ServiceOrders/GetByDate', {
      startDate,
      endDate,
    }) as Observable<ServiceOrder>;
  }

  public changeCustomer(serviceOrderId: string, customerId: string) {
    return this.httpHelper.put(`/ServiceOrders/Customer`, {
      serviceOrderId, customerId
    });
  }

  public changeDescription(serviceOrderId: string, description: string) {
    return this.httpHelper.put(`/ServiceOrders/Description`, {
      serviceOrderId, description
    });
  }
}
