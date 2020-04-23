import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthDataStorage } from "../../../common/auth-data.storage";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";
import { Country } from "../../../common/models/country";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService, TOKEN_STORAGE_KEY } from "../../shared/api.service";
import { TokenModel } from "../../../shared/models/token-model";
import { ApplicationDomain } from "../../../shared/enums/application-domain";
import { CountryService } from "../../../common/services/country.service";
import { RegisterService } from "../../../common/services/registration.service";

@Component({
    selector: "app-enable-2fa",
    templateUrl: "./enable-2fa.component.html",
    styleUrls: ["./enable-2fa.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Enable2faComponent implements OnInit, OnDestroy {
    addPhoneForm: FormGroup;
    verifyPhoneForm: FormGroup;
    countries: Country[];
    step: number;
    @Output() verifyPhone = new EventEmitter();
    private ngUnsub = new Subject();

    constructor(
        private countryService: CountryService,
        private router: Router,
        private authDataStorage: AuthDataStorage,
        private fb: FormBuilder,
        private api: ApiService,
        private cd: ChangeDetectorRef,
        private registerApi: RegisterService) {
    }

    ngOnInit() {
        this.countryService
            .getCountries()
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(countries => {
                this.countries = countries;
                this.step = 1;
                this.cd.markForCheck();
            });

        this.addPhoneForm = this.fb.group({
            "countryCode": this.fb.control("", [Validators.required]),
            "number": this.fb.control("", [Validators.required])
        });

        this.verifyPhoneForm = this.fb.group({
            "number": this.fb.control({ value: "123", disabled: true }, Validators.required),
            "code": this.fb.control("", Validators.required)
        });
        this.step = 1;
    }

    incrimentStep() {
        this.step++;
    }

    decrimentStep() {
        this.step--;
    }

    setPhone() {
        if (this.addPhoneForm.invalid) {
            return;
        }
        const number = `+${this.addPhoneForm.value.countryCode}${this.addPhoneForm.value.number}`;
        const phoneNumberObj = {
            "phoneNumber": this.addPhoneForm.value.number,
            "countryCode": parseInt(this.addPhoneForm.value.countryCode)
        }
        this.registerApi
            .clientPhone(phoneNumberObj, { headers: { "Content-Type": "application/json" } })
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(x => {
                this.verifyPhoneForm = this.fb.group({
                    "number": this.fb.control({ value: number, disabled: true }, Validators.required),
                    "code": this.fb.control("", Validators.required)
                });
                this.incrimentStep();
                this.cd.detectChanges();
            }, err => alert(err));
    }

    onVerifyPhone() {
        // TODO: add step to local storage
        if (this.verifyPhoneForm.invalid) {
            return;
        }

        const phoneVerifyCode = {
            "code": this.verifyPhoneForm.value.code
        };

        this.registerApi
            .verifyClientPhone(phoneVerifyCode)
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
            message: "Cannot verify Client Phone"
        };
        this.verifyPhone.emit(model);
    }

    completeRegistration() {
        this.api
            .get("dev/register")
            .subscribe(x => {
                this.authDataStorage.unsetToken();
                this.router.navigate(["/"]);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }
}
