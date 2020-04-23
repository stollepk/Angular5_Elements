import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { ApiService, TOKEN_STORAGE_KEY } from "../../shared/api.service";
import { ApplicationDomain } from "../../../shared/enums/application-domain";
import { TokenModel } from "../../../shared/models/token-model";

@Component({
    selector: "app-recover-password",
    templateUrl: "./recover-password.component.html",
    styleUrls: ["./recover-password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {
    form: FormGroup;

    private ngUnsub = new Subject();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private api: ApiService) { }

    ngOnInit() {
        this.form = this.fb.group({
            "email": this.fb.control("", [Validators.compose([Validators.required, Validators.email])]),
        });
    }

    recoverPassword() {
        if (this.form.invalid) {
            return;
        }

        this.api
            .post("auth/forgot-password", this.form.value)
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(this.onSuccessfulLogin.bind(this), err => alert(err));
    }

    private onSuccessfulLogin(tokenModel: TokenModel): void {
        // if (tokenModel.domain !== ApplicationDomain.Client) {
        //     alert("Access error");
        //     return;
        // }
        // localStorage.setItem(TOKEN_STORAGE_KEY, tokenModel.token);
        // this.route
        //     .queryParamMap
        //     .pipe(
        //         takeUntil(this.ngUnsub)
        //     )
        //     .subscribe(params => {
        //         const url = params.get("returnUrl") || "/";
        //         this.router.navigate([url]);
        //     });
        alert("If you have lost your account password, simply enter your email address below. We'll send you an email with instructions to reset your password.");
    }

    public ngOnDestroy(): void {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }
}
