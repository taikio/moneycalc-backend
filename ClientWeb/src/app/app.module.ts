import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './modules/auth/auth.module';
import { Interceptor } from './modules/http/interceptor.module';
import { UiModule } from './modules/ui/ui.module';
import { SharedModule } from './modules/shared/shared.module';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ServiceOrderModule } from './modules/service-order/service-order.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AgGridModule } from 'ag-grid-angular';
import { Ng2LoadingSpinnerModule, INg2LoadingSpinnerConfig, ANIMATION_TYPES } from 'ng2-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const loadingConfig: INg2LoadingSpinnerConfig = {
  animationType: ANIMATION_TYPES.halfCircle,
  spinnerPosition: 'center',
  backdropBorderRadius: '15px',
  spinnerSize: 'xl',
  spinnerFontSize: '2rem'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    AuthModule,
    Interceptor,
    UiModule,
    SharedModule,
    PerfectScrollbarModule,
    ServiceOrderModule,
    DashboardModule,
    CustomerModule,
    AgGridModule.withComponents([]),
    Ng2LoadingSpinnerModule.forRoot(loadingConfig),

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
