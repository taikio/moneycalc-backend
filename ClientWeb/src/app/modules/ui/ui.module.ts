import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { NavContentComponent } from './components/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './components/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './components/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './components/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './components/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './components/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './components/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ConfigurationComponent } from './components/admin/configuration/configuration.component';
import { NavRightComponent } from './components/admin/nav-bar/nav-right/nav-right.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule, CardModule } from '../shared/components';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NavigationItem } from './components/admin/navigation/navigation';
import { SharedModule } from '../shared/shared.module';
import { Ng2LoadingSpinnerModule, INg2LoadingSpinnerConfig, ANIMATION_TYPES } from 'ng2-loading-spinner';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';
import { NgbModule, NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const loadingConfig: INg2LoadingSpinnerConfig = {
  animationType: ANIMATION_TYPES.halfCircle,
  backdropColor: 'rgba(0, 0, 0, 0.5)',
  spinnerColor: '#fff',
  spinnerPosition: 'center',
  backdropBorderRadius: '15px',
  spinnerSize: 'xl',
  spinnerFontSize: '2rem'
};

@NgModule({
  declarations: [
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    ConfigurationComponent,
    NavRightComponent,
    NotificationMessageComponent
  ],
  exports: [
    NavContentComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    NgbModule,
    RouterModule,
    BreadcrumbModule,
    CardModule,
    PerfectScrollbarModule,
    SharedModule,
    Ng2LoadingSpinnerModule.forRoot(loadingConfig),

    // NgbDatepickerModule,
    // NgbDropdownModule,
  ],
  providers: [
    NavigationItem,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class UiModule { }