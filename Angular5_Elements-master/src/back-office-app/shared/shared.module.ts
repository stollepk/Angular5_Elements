import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApiService } from "./api.service";
import { AuthGuard } from "./auth-guard.service";
import { AuthHttpInterceptor } from "./auth.interceptor";
import { ClientVerificationStatusPipe } from "./pipes/client-verification-status.pipe";
import { EnumKeysPipe } from "./pipes/enum-keys.pipe";
import {CountryService} from "../../common/services/country.service";
import {ElementsServicesModule} from "../../common/services/elements-services.module";
import {AuthDataStorage} from "../../common/auth-data.storage";
import {HeaderModule} from "./components/header/header.module";

const MODULES = [
  CommonModule,
  HttpClientModule,
  ElementsServicesModule
];

@NgModule({
  imports: [MODULES],
  providers: [
    ApiService,
    AuthGuard,
    CountryService,
    AuthDataStorage,
    HeaderModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  declarations: [ClientVerificationStatusPipe, EnumKeysPipe],
  exports: [MODULES, ClientVerificationStatusPipe, EnumKeysPipe]
})
export class SharedModule { }
