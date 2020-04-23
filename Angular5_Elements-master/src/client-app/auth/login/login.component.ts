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
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
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
            "email": this.fb.control("", [Validators.compose([Validators.required, Validators.email])]),
            "password": this.fb.control("", [Validators.required])
        });
    }

    login() {
        if (this.form.invalid) {
            return;
        }

        this.api
            .post("auth/login", this.form.value)
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(this.onSuccessfulLogin.bind(this), err => alert(err));
    }

    private onSuccessfulLogin(tokenModel: TokenModel): void {
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

    public ngOnDestroy(): void {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }
}
