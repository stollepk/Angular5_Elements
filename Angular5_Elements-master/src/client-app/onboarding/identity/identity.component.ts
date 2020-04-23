import {Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef, Input, Injectable} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Country } from "../../../common/models/country";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";
import { TOKEN_STORAGE_KEY} from "../../shared/api.service";
import { CountryService } from "../../../common/services/country.service";
import {ClientService} from "../../../common/services/client.service";
import {ClientIdentityModel} from "../../../common/models/client-identity.model";
import {DatePipe} from "@angular/common";
import {PersonalParticularsModel} from "../../../common/models/personal-particulars.model";
import {AddressData, ClientAddressModel} from "../../../common/models/client-address.model";
import {COUNTRIES_WITHOUT_POSTCODES} from "../../../common/countries-without-postal-codes";
import {ElementsApiService} from "../../../common/services/elements-api.service";
import {NgbDateAdapter} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "../../../common/ng-date-native-adapter";

@Component({
    selector: "app-identity",
    templateUrl: "./identity.component.html",
    styleUrls: ["./identity.component.scss"],
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityComponent implements OnInit {

  @Input() onboardingMode = true;
  form: FormGroup;
  countries: Country[];
  ngUnsub = new Subject();
  @Output() verifyIdentity = new EventEmitter();
  isInitialized = false;
  isSubmitting = false;
  isPostalCodeRequired = true;

  constructor(
      private fb: FormBuilder,
      private countryService: CountryService,
      private clientService: ClientService,
      private cd: ChangeDetectorRef,
      private datePipe: DatePipe,
      private api: ElementsApiService) { }

  ngOnInit() {
    this.countryService.getCountries()
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(x => {
          this.countries = x;
          this.cd.markForCheck();
        });

    this.clientService
        .getClientIdentity()
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(model => {
          this.form = this.buildForm(model);
          this.registerOnCountryChange();
          this.isInitialized = true;
          this.cd.markForCheck();
        });
  }

  private buildForm(model: ClientIdentityModel) {
    const personalParticulars = model.personalParticularsModel || new PersonalParticularsModel();
    const clientAddress = model.clientAddressModel || new ClientAddressModel();
    const addressData = clientAddress.addressData || new AddressData();
    return this.fb.group({
      "personalParticularsModel": this.fb.group({
        "clientId": this.fb.control(personalParticulars.clientId || 0),
        "firstName": this.fb.control(personalParticulars.firstName, Validators.required),
        "middleName": this.fb.control(personalParticulars.middleName),
        "lastName": this.fb.control(personalParticulars.lastName, Validators.required),
        "birthday": this.fb.control(this.datePipe.transform(personalParticulars.birthday, "yyyy-MM-dd"), Validators.required),
        "gender": this.fb.control(personalParticulars.gender, Validators.required),
        "profession": this.fb.control(personalParticulars.profession),
        "ssn": this.fb.control(personalParticulars.ssn),
        "placeOfBirthCountryId": this.fb.control(personalParticulars.placeOfBirthCountryId, Validators.required),
        "citizenshipCountryId": this.fb.control(personalParticulars.citizenshipCountryId, Validators.required),
      }),
      "passportNumber": this.fb.control(model.passportNumber || "123", Validators.required),
      "clientAddressModel": this.fb.group({
        "id": this.fb.control(clientAddress.id || 0),
        "addressData": this.fb.group({
          "id": this.fb.control(addressData.id || 0),
          "line1": this.fb.control(addressData.line1, Validators.required),
          "line2": this.fb.control(addressData.line2),
          "city": this.fb.control(addressData.city, Validators.required),
          "postalCode": this.fb.control(addressData.postalCode, Validators.required),
          "stateProvidence": this.fb.control(addressData.stateProvidence),
          "countryId": this.fb.control(addressData.countryId, Validators.required)
        }),
        "addressType": this.fb.control(clientAddress.addressType || 1, Validators.required),
        "clientId": this.fb.control(clientAddress.clientId || 0)
      })
    });
  }

  onVerifyIdentity() {
    if (this.form.invalid) {
        return;
    }
    const model = {
        isVerified: false,
        message: "Cannot create identity"
    };
    const formData = this.form.value as ClientIdentityModel;
    this.isSubmitting = true;
    if (formData.clientAddressModel.id) {
      this.api.post("client/update-personal-info", formData)
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(
          res => {
            this.disableSubmitFlagAndRefresh();
          },
          err => {
            alert(err);
            this.disableSubmitFlagAndRefresh();
          });
    } else {
      this.api.post("onboarding/identity", formData)
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(
          tokenModel => {
              model.isVerified = true;
              localStorage.setItem(TOKEN_STORAGE_KEY, tokenModel.token);
              this.verifyIdentity.emit(model);
              this.disableSubmitFlagAndRefresh();
          },
          err => {
            alert(err);
            this.disableSubmitFlagAndRefresh();
          });
    }
  }

  registerOnCountryChange() {
    this.form
      .get("clientAddressModel.addressData.countryId")
      .valueChanges
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(value => {
        const countryName = this.countries.find(x => x.id === parseInt(value, 10)).countryName;
        const index = COUNTRIES_WITHOUT_POSTCODES.map(x => x[0]).findIndex(x => x === countryName);
        console.log(COUNTRIES_WITHOUT_POSTCODES.map(x => x[0]));
        const postalCodeControl = this.form.get("clientAddressModel.addressData.postalCode");
        this.isPostalCodeRequired = index === -1;
        if (!this.isPostalCodeRequired) {
          postalCodeControl.clearValidators();
          postalCodeControl.setValue("");
        } else {
          postalCodeControl.setValidators([Validators.required]);
        }
        postalCodeControl.updateValueAndValidity();
        this.cd.markForCheck();
      }, err => console.log(err));
  }

  onBirthdayChange($event) {
    console.log($event);
  }

  private disableSubmitFlagAndRefresh() {
    this.isSubmitting = false;
    this.cd.markForCheck();
  }
}
