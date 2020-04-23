import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ApiService, TOKEN_STORAGE_KEY } from "../../shared/api.service";
import { ApplicationDomain } from "../../../shared/enums/application-domain";
import { TokenModel } from "../../../shared/models/token-model";
import { AuthDataStorage } from "../../../common/auth-data.storage";

@Component({
    selector: "app-login-two-factor",
    templateUrl: "./login-two-factor.component.html",
    styleUrls: ["./login-two-factor.component.scss"]
})
export class LoginTwoFactorComponent {
    form: FormGroup;

    private ngUnsub = new Subject();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authDataStorage: AuthDataStorage,
        private route: ActivatedRoute,
        private api: ApiService) { }

    ngOnInit() {
        this.form = this.fb.group({
            "Code": this.fb.control("", [Validators.required])
        });
    }

    verifyTwoFactorAuthCode() {
        if (this.form.invalid) {
            return;
        } 

        this.api
            .get("auth/login-2fa?Code=" + this.form.value.Code)
            .subscribe(this.onSuccessfulVerify.bind(this), err => alert(err));
    }

    private onSuccessfulVerify(tokenModel: TokenModel): void {
        if (tokenModel.domain !== ApplicationDomain.Client) {
            alert("Access error");
            return;
        }
        localStorage.setItem(TOKEN_STORAGE_KEY, tokenModel.token);
        this.route
            .queryParamMap
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(params => {
                const url = params.get("returnUrl") || "/";
                this.router.navigate([url]);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }
}
