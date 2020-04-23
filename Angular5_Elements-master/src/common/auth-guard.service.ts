import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { AuthDataStorage } from "./auth-data.storage";
import "rxjs/add/observable/zip";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private authDataStorage: AuthDataStorage) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.check(state);
    }

    public canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.check(state);
    }

    private check(state: RouterStateSnapshot) {
        const isValidToken = this.authDataStorage.isTokenExistsAndNotExpired();
        if (!isValidToken) {
            const retUrl = state.url === "/onboarding" ? null : state.url;
            this.router.navigate(["/auth/login"], { queryParams: { returnUrl: retUrl } });
        }
        return isValidToken;
    }
}
