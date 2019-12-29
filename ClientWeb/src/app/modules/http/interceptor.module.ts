import {
  Injectable,
  NgModule
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, ],
})
export class Interceptor {}
