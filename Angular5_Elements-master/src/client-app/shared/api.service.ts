import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { AuthDataStorage } from "../../common/auth-data.storage";

export const TOKEN_STORAGE_KEY = "token";

@Injectable()
export class ApiService {
    private apiUrl = environment.apiEndpoint;

    constructor(
      private http: HttpClient, 
      private router: Router, 
      private authDataStorage: AuthDataStorage,
    ) {
    }

    get<T>(url: string, options?: any): Observable<T | any> {
      const opts = options || {};
      return this.http
        .get(`${this.apiUrl}/${url}`, opts)
        .pipe(
          catchError(this.processError.bind(this))
        );
    }

    post<T>(url: string, body: any, options?: any): Observable<T | any> {
      const opts = options || {};
      return this.http
        .post(`${this.apiUrl}/${url}`, body, opts)
        .pipe(
          catchError(this.processError.bind(this))
        );
    }

    put<T>(url: string, body: any, options?: any): Observable<T | any> {
      const opts = options || {};
      return this.http
        .put(`${this.apiUrl}/${url}`, body, opts)
        .pipe(
          catchError(this.processError.bind(this))
        );
    }

    private processError(err: Response, caught?) {
      console.log(err);
      if (err.status === 401) {
        this.authDataStorage.unsetToken();
        return this.router.navigate(["/auth/login"], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
      }
      return Observable.throw(new Error(`${err.status} ${err.statusText}`));
    }
}
