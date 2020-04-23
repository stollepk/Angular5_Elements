import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import "rxjs/add/observable/throw";

export const TOKEN_STORAGE_KEY = "token";

@Injectable()
export class ApiService {

  private apiUrl = `${environment.apiEndpoint}`;

  constructor(private http: HttpClient, private router: Router) { }

  post<T>(url: string, body: any, options?: any): Observable<T | any> {
    const opts = options || {};
    return this.http
      .post(`${this.apiUrl}/${url}`, body, opts)
      .pipe(
        catchError(this.processError.bind(this))
      );
  }

  get<T>(url: string, options?: any): Observable<T | any> {
      const opts = options || {};
      return this.http
      .get(`${this.apiUrl}/${url}`, opts)
      .pipe(
        catchError(this.processError.bind(this))
      );
  }

  private processError(err: Response, caught?) {
    console.log(err);
    if (err.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    }
    return Observable.throw(new Error(`${err.status} ${err.statusText}`));
  }
}
