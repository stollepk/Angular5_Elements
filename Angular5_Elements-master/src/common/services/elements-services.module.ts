import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthDataStorage } from "../auth-data.storage";
import { ClientService } from "./client.service";
import { ElementsApiService } from "./elements-api.service";
import { TradeDataService } from "./trade-data.service";
import { RegisterService } from "./registration.service";
import {e} from "@angular/core/src/render3";

export function apiServiceFactory(http: HttpClient, router: Router, authDataStorage: AuthDataStorage) {
  const onError = (err: HttpErrorResponse) => {
    console.log(err);
    if (err.status === 401) {
      this.authDataStorage.unsetToken();
      return this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    }
    let msg = err.message;
    if (err.error && Array.isArray(err.error.errors)) {
      const msgParts = [msg, ...err.error.errors.map(x => x.message)];
      msg = msgParts.join("\n");
    }
    return Observable.throw(new Error(msg));
  };
  return new ElementsApiService(http, router, authDataStorage, onError);
}

@NgModule({
  providers: [
    {
      provide: ElementsApiService,
      useFactory: apiServiceFactory,
      deps: [HttpClient, Router, AuthDataStorage]
    },
    ClientService,
    TradeDataService,
    RegisterService
  ]
})
export class ElementsServicesModule {}
