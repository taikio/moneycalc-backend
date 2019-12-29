import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApexChartService } from '../../shared/components/chart/apex-chart/apex-chart.service';
import { ChartDB } from '../fack-db/chart-data';
import { BillService, AccountBalance } from '../../bill/services/bill.service';
import { Observable, Subscription } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/modules/ui/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit, OnDestroy {

  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any; n;
  public deviceProgressBar: any;

  public startDate: NgbDate;
  public endDate: NgbDate;
  public accountBalance: AccountBalance;
  public subscriptions: Array<Subscription>;

  constructor(
    public apexEvent: ApexChartService,
    private billService: BillService,
    private loading: LoadingService) {

    this.subscriptions = new Array<Subscription>();
    this.chartDB = ChartDB;
    this.dailyVisitorStatus = '1y';

    this.deviceProgressBar = [
      {
        type: 'success',
        value: 66
      }, {
        type: 'primary',
        value: 26
      }, {
        type: 'danger',
        value: 8
      }
    ];
  }

  /* ========= life sycle */
  ngOnInit() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();

    const start = new Date(y, m, 1);
    const end = new Date(y, m, this.lastDay(y, m));

    this.startDate = this.getNgbDate(start);
    this.endDate = this.getNgbDate(end);

    this.search();
  }

  ngOnDestroy() {

    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /* ========== end lifie sycle */

  dailyVisitorEvent(status) {
    this.dailyVisitorStatus = status;
    switch (status) {
      case '1m':
        this.dailyVisitorAxis = {
          min: new Date('28 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        };
        break;
      case '6m':
        this.dailyVisitorAxis = {
          min: new Date('27 Sep 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case '1y':
        this.dailyVisitorAxis = {
          min: new Date('27 Feb 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'ytd':
        this.dailyVisitorAxis = {
          min: new Date('01 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'all':
        this.dailyVisitorAxis = {
          min: undefined,
          max: undefined
        };
        break;
    }
  }

  search() {
    const start = `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`;
    const end = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`;

    this.loading.showHide(true);

    this.subscriptions.push(
      this.billService.AccountBalance(start, end)
      .subscribe(response => {
        this.accountBalance = response;
        this.loading.showHide(false);
      },
      error => {
        console.log(error);
        this.loading.showHide(false);
        Swal.fire('Ops..', 'Ocorreu um erro ao atualizar o dashboard', 'error');
      })
    );

    // this.accountBalance.subscribe((data) => console.log(data), (error) => console.log(error));
  }


  getNgbDate(date: Date) {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  lastDay(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }
}
