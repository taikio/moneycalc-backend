import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  AuthSigninComponent
} from './components/auth-signin/auth-signin.component';
import {
  AuthSignupComponent
} from './components/auth-signup/auth-signup.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  AuthGuard
} from './services/auth.guard';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'sign',
      component: AuthSigninComponent
    },
    {
      path: 'signup',
      component: AuthSignupComponent
    }
  ]
}]

@NgModule({
  declarations: [
    AuthSigninComponent,
    AuthSignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }
