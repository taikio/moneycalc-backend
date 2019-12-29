import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) { }

  private getUrl(route: string): string {
    return environment.apiBaseUrl + route;
  }

  public get(route: string, parameters?: any): Observable<any> {
    console.log(route);
    return this.http.get(this.getUrl(route), { params: parameters }) as Observable<any>;
  }

  public post(route: string, body: any, isUrlencoded = false) {

    const headers = isUrlencoded ? new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded', Accept: 'application/json' })
      : new HttpHeaders({ 'content-type': 'application/json', Accept: 'pplication/json' });

    return this.http.post(this.getUrl(route), body, { headers }) as Observable<any>;
  }

  public put(route: string, body: any, isUrlencoded = false) {

    const headers = isUrlencoded ? new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded', Accept: 'application/json' })
      : new HttpHeaders({ 'content-type': 'application/json', Accept: 'pplication/json' });

    return this.http.put(this.getUrl(route), body, { headers }) as Observable<any>;
  }
}
