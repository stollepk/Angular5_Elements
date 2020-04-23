import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Country } from "../../../common/models/country";
import { Subject } from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil} from "rxjs/operators";
import { ApiService } from "../../shared/api.service";
import { CountryService } from "../../../common/services/country.service";
import {Observable} from "rxjs/Observable";
import {BankService} from "../../../common/services/bank.service";
import {ElementsApiService} from "../../../common/services/elements-api.service";
import {ClientService} from "../../../common/services/client.service";

@Component({
    selector: "app-add-bank",
    templateUrl: "./add-bank.component.html",
    styleUrls: ["./add-bank.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBankComponent implements OnInit, OnDestroy {
    @Input() onboardingMode = true;
    form: FormGroup;
    countries: Country[];
    swiftCodes: string[];
    ngUnsub = new Subject();
    @ViewChild("bankInput") bankInput: ElementRef;
    @Output() verifyBank = new EventEmitter();
    @Output() afterSubmit = new EventEmitter();
    // TODO: move bank selector to component
    searchBanks = (text$: Observable<string>) =>
      text$
        .pipe(
          filter(x => x.length > 2),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(text => this.bankService.searchBanks(text, this.form.get("countryId").value)),
          takeUntil(this.ngUnsub)
        )

    bankDisplayFn = val => val.name;

    constructor(
      private fb: FormBuilder,
      private clientService: ClientService,
      private countryService: CountryService,
      private bankService: BankService,
      private api: ElementsApiService,
      private cd: ChangeDetectorRef) { }

    ngOnInit() {
      this.countryService
        .getCountries()
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(x => this.countries = x);

      this.clientService
        .getPublicInfo()
        .pipe(
          takeUntil(this.ngUnsub)
        )
        .subscribe(clientInfo => {
          const accountName = this.onboardingMode ? "Default" : "";
          this.form = this.fb.group({
            "name": this.fb.control(accountName, Validators.required),
            "accountHolder": this.fb.control(`${clientInfo.firstName} ${clientInfo.lastName}`, Validators.required),
            "accountNumber": this.fb.control("", Validators.required),
            "swiftCode": this.fb.control("", Validators.required),
            "bankId": this.fb.control(0, Validators.required),
            "clearingCode": this.fb.control(""),
            "countryId": this.fb.control("", Validators.required),
            "dateFrom": this.fb.control(new Date().toISOString(), Validators.required),
            "dateTo": this.fb.control(null)
          });
          this.cd.markForCheck();
        });


    }

    addBankAccount() {
        if (this.form.invalid) {
            return;
        }
        const model = {
            isVerified: false,
            message: "Cannot create Bank"
        };
        this.api.post("onboarding/add-bank-account", this.form.value)
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(res => {
                this.afterSubmit.emit();
                if (res == null) {
                    model.isVerified = true;
                    this.verifyBank.emit(model);
                }
            }, err => alert(err));
    }

    onVerifyBank() {
        const model = {
            isVerified: true,
            message: "Bank not verified"
        };
        this.verifyBank.emit(model);
    }

    onBankSelect($event) {
      const bank = $event.item;
      this.swiftCodes = bank.swiftCodes;
      this.form.get("bankId").setValue(bank.id);
      this.form.get("countryId").setValue(bank.countryId);
    }

    onCountryChange($event) {
      this.form.get("bankId").setValue(0);
      this.bankInput.nativeElement.value = "";
    }

    ngOnDestroy(): void {
      this.ngUnsub.next();
      this.ngUnsub.complete();
    }
}
