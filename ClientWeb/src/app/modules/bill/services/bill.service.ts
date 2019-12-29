import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../http/services/http-helper.service';
import { HttpParams } from '@angular/common/http';
import { PaymentMethod } from '../../lookup/services/lookup.service';
import { Observable } from 'rxjs';


export interface Bill {
  id: string;
  paymentMethod: PaymentMethod;
  value: number;
  destiny: 'R' | 'P';
  status: string;
  paid: boolean;
  dueDate: Date;
  payDate: Date;
  reversalDate: Date;
  cancelDate: Date;
}

export interface NewBillDto {
  paymentMethodSysId: string;
  value: number;
  destiny: 'R' | 'P';
  dueDate: string;
  description: string;
}

export interface AccountBalance {
  incomingPendingQuantity: number;
  outgoingPendingQuantity: number;
  incomingPaidQuantity: number;
  outgoingPaidQuantity: number;
  incomingPendingValue: number;
  outgoingPendingValue: number;
  incomingPaidValue: number;
  outgoingPaidValue: number;
  incomingOutgoingBalance: number;
  incomingOutgoingProjection: number;
}

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpHelper: HttpHelperService) { }

  public new(bill: NewBillDto) {
    if (bill.destiny === 'P') {
      return this.httpHelper.post('/Bills/NewPayable', bill);
    } else {
      return this.httpHelper.post('/Bills/NewReceivable', bill);
    }
  }

  public getByDate(startDate: string, endDate: string, destiny: 'R' | 'P'): Observable<Bill> {
    return this.httpHelper.get('/Bills/GetByDate', {
      startDate,
      endDate,
      destiny
    }) as Observable<Bill>;
  }

  public AccountBalance(startDate: string, endDate: string) {
    return this.httpHelper.get('/Bills/AccountBalance', {
      startDate,
      endDate,
    }) as Observable<AccountBalance>;
  }

  public changePaymentMethod(id: string, paymentMethodSysId: string) {
    return this.httpHelper.put('/Bills/PaymentMethod', {
      id, paymentMethodSysId
    });
  }

  public changeDueDate(id: string, dueDate: string) {
    return this.httpHelper.put('/Bills/DueDate', {
      id, dueDate
    });
  }

  public changeValue(id: string, value: number) {
    return this.httpHelper.put('/Bills/Value', {
      id, value
    });
  }

  public cancel(id: string) {
    return this.httpHelper.post(`/Bills/Cancel/${id}`, null);
  }

  public makeRetirement(id: string) {
    return this.httpHelper.put(`/Bills/MakeRetirement/${id}`, null);
  }
}
