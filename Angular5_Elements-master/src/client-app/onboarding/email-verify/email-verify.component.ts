import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { AuthDataStorage } from "../../../common/auth-data.storage";
import { TokenModel } from "../../../shared/models/token-model";
import { ApplicationDomain } from "../../../shared/enums/application-domain";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RegisterService } from "../../../common/services/registration.service";
import { ApiService, TOKEN_STORAGE_KEY } from "../../shared/api.service";

@Component({
    selector: "app-email-verify",
    templateUrl: "./email-verify.component.html",
    styleUrls: ["./email-verify.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

    private ngUnsub = new Subject();

    @Output() verifyClientEmail = new EventEmitter();

    emailVerifyForm = new FormGroup({
        code: new FormControl()
    });

    constructor(
        private authDataStorage: AuthDataStorage,
        private fb: FormBuilder,
        private registerService: RegisterService) {
    }

    ngOnInit() {
        this.emailVerifyForm = this.fb.group({
            "code": this.fb.control("", [Validators.required]),
        });
    }

    verifyEmail() {
        if (this.emailVerifyForm.invalid) {
            return;
        }
        
        this.registerService
            .verifyClientEmail(this.emailVerifyForm.value)
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(this.onSuccessfulVerify.bind(this), err => alert(err));
    }

    private onSuccessfulVerify(tokenModel: TokenModel): void {
        if (tokenModel.domain !== ApplicationDomain.Client) {
            alert("Access error");
            return;
        }
        localStorage.setItem(TOKEN_STORAGE_KEY, tokenModel.token);
        const model = {
            isVerified: true,
            message: "Cannot verify Client Email"
        };
        this.verifyClientEmail.emit(model);
    }

    ngOnDestroy(): void {
    }
}
