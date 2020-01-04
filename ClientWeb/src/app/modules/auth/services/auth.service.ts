import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {
  environment
} from 'src/environments/environment';
import {
  Observable,
  of,
  Subject,
  defer,
  BehaviorSubject
} from 'rxjs';
import { HttpHelperService } from '../../http/services/http-helper.service';
import { switchMap, map } from 'rxjs/operators';


export interface AuthToken {
  access_token: string;
}

export interface UserToken {
  username: string;
  password: string;
  token?: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logger = new BehaviorSubject<boolean>(false);

  constructor(private httpHelper: HttpHelperService) {
    this.logger.next(!!this.getCurrentUser());
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  isLogged(): boolean {
    let currentUser = this.getCurrentUser();

    return currentUser != null && currentUser.token != null;
  }

  public login(username: string, password: string): Observable<UserToken> {
    // const body = `grant_type=password&username=${username}&password=${password}`;
    const body = { email: username, password: password };
    const request = this.httpHelper.post('/users/token', body, false) as Observable<any>;

    return request.pipe(
      map((token: any) => {
        console.log('auth return', token);
        const user: UserToken = {
          username,
          password,
          token: token.token
        };

        localStorage.setItem('current_user', JSON.stringify(user));
        this.logger.next(true);

        return user;
      })
    ) as Observable<UserToken>;
  }

  public logout() {
    this.logger.next(false);
    localStorage.removeItem('current_user');
  }

  public getCurrentUser(): UserToken {
    return JSON.parse(localStorage.getItem('current_user')) as UserToken;
  }

  public getProfile() {
    return this.httpHelper.get('/Users/GetProfile') as Observable<User>;
  }
}
