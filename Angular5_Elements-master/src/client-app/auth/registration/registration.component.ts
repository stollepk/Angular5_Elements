import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ApiService, TOKEN_STORAGE_KEY } from "../../shared/api.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenModel } from "../../../shared/models/token-model";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-registration",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;

    private ngUnsub = new Subject();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private api: ApiService) { }

    ngOnInit() {
        this.form = this.fb.group({
            "email": this.fb.control("", [Validators.required, Validators.email]),
            "firstName": this.fb.control("", [Validators.required]),
            "lastName": this.fb.control("", [Validators.required]),
            "password": this.fb.control("", [Validators.required]),
            "isAgreeWithTerms": this.fb.control(false, [Validators.requiredTrue]),
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        let clientData = this.form.value;
        clientData.name = clientData.firstName + ' ' + clientData.lastName;
        this.api
            .post("register/client", clientData)
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(this.onSuccessfulRegistration.bind(this), err => alert(err));
    }

    onSuccessfulRegistration(tokenModel: TokenModel): void {
        localStorage.setItem(TOKEN_STORAGE_KEY, tokenModel.token);
        this.router.navigate(["/"]);
    }
}
