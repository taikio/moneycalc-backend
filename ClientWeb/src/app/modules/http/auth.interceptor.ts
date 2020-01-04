import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { NotifyService } from '../ui/services/notify.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService, private notify: NotifyService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshTokenInProgress = false)
            );
          }
        } else if (error && error.status === 400) {
          console.log('erro do servidor', error.error);
          let serverErrors = '';

          for (let key in error.error) {

            if (serverErrors.length > 0){
              serverErrors += '; ';
            }
            serverErrors += error.error[key];

          }

          Swal.fire('Opps...', serverErrors, 'error');
          // const validationErrorDictionary = JSON.parse(error.error);

          // console.log('erro do servidor', validationErrorDictionary);

          /* After hadle the error continue the request life cycle */
          return next.handle(req);
        } else {
          return throwError(error);
        }
      })
    ) as Observable<any>;
  }

  private refreshAccessToken(): Observable<any> {
    this.notify.update('Obtendo token da sessão', 'info');
    // Swal.fire('Opps...', 'Ocorreu um erro ao buscar os clientes', 'info');
    const currentUser = this.auth.getCurrentUser();
    return this.auth.login(currentUser.username, currentUser.password);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.auth.isLogged()) {
      return request;
    }

    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.auth.getCurrentUser().token)
    });
  }
}
