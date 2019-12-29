import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  Observable, of
} from 'rxjs';
import {
  AuthService
} from './auth.service';
import { take, tap, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      map((user: boolean) => {
        return user;
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('🤨 Access denied for route: ' + next.url[0].path);
          this.router.navigate(['/auth/sign']);
        }
      })
    );
  }
}
