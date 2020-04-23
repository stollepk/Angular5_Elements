import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthDataStorage } from "../../common/auth-data.storage";
import { switchMap } from "rxjs/operators";

@Injectable()
export class VerifyGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authDataStorage: AuthDataStorage) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.check();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.check();
    }

    private check() {
        return Observable
            .zip(
                this.authDataStorage.getBooleanClaimValue("RequireEmailConfirmation"),
                this.authDataStorage.getBooleanClaimValue("RequirePhoneConfirmation"),
                this.authDataStorage.getBooleanClaimValue("RequirePersonalParticulars"),
                this.authDataStorage.getBooleanClaimValue("Require2fa"),
            )
            .pipe(
                switchMap(data => {
                    const isEmailVerifyRequire = data[0];
                    const isPhoneVerifyRequire = data[1];
                    const isPersonalVerifyRequire = data[2];
                    const is2FaRequire = data[3];

                    if (isEmailVerifyRequire || isPhoneVerifyRequire || isPersonalVerifyRequire) {
                        this.router.navigate(["/onboarding"]);
                        return Observable.of(false);
                    } else if (is2FaRequire) {
                        this.router.navigate(["/auth/login-two-factor"]);
                        return Observable.of(false);
                    } else {
                        return Observable.of(true);
                    }
                })
            );
    }
}
