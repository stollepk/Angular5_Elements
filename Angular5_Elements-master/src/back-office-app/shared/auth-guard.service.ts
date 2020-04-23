import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { TOKEN_STORAGE_KEY } from "./api.service";
import "rxjs/add/observable/of";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

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
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      this.router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
    }
    return !!token;
  }
}
