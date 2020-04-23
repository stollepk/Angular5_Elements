import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

@Injectable()
export class AuthDataStorage {
    private tokenStorageKey = "token";

    getToken(): string {
        return localStorage.getItem(this.tokenStorageKey);
    }

    unsetToken() {
        localStorage.removeItem(this.tokenStorageKey);
    }

    isTokenExistsAndNotExpired() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const payload = this.getTokenPayload(token);
        const exp = payload["exp"];
        const now = moment().unix();
        return now <= exp;
    }

    getClientId(): Observable<number> {
        const token = this.getToken();
        const payload = this.getTokenPayload(token);
        return Observable.of(payload["ClientId"]);
    }

    getBooleanClaimValue(name: string): Observable<boolean> {
        const token = this.getToken();
        const payload = this.getTokenPayload(token);
        const isVerified = payload[name] === "True";
        return Observable.of(isVerified);
    }

    private getTokenPayload(token: string): Object {
        const tokenParts = token.split(".");
        return JSON.parse(atob(tokenParts[1]));
    }
}
