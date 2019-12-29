import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAnalyticsComponent } from './components/dash-analytics.component';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbProgressbarModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashAnalyticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbProgressbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class DashboardModule { }
