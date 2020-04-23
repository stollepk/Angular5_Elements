import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { AuthDataStorage } from "../../../common/auth-data.storage";
import { ClientValidation } from "../models/client-validation";

@Injectable()
export class ClientValidationService {

    constructor(
        private api: ApiService,
        private authDataStorage: AuthDataStorage,
    ) { }

    getStep(): Observable<number> {
        return Observable
            .zip(
                this.authDataStorage.getBooleanClaimValue("RequireEmailConfirmation"),
                this.authDataStorage.getBooleanClaimValue("RequirePhoneConfirmation"),
                this.authDataStorage.getBooleanClaimValue("RequirePersonalParticulars")
            )
            .pipe(
                switchMap(data => {
                    const isEmailVerifyRequire = data[0];
                    const isPhoneVerifyRequire = data[1];
                    const isPersonalVerifyRequire = data[2];

                    if (isEmailVerifyRequire) {
                        return Observable.of(0);
                    } else if (isPhoneVerifyRequire) {
                        return Observable.of(1);
                    } else if (isPersonalVerifyRequire) {
                        return Observable.of(2);
                    }

                    return Observable.of(3);
                })
            );
    }

    getModel(): Observable<ClientValidation> {
        return this.getClientValidModel();
    }

    private getClientValidModel(): Observable<ClientValidation> {
        return this.api.get("client/get-validation");
    }
}
