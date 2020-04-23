import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {ClientService} from "../../../common/services/client.service";
import {Subject} from "rxjs/Subject";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {ClientBankAccountModel} from "../../../common/models/client-bank-account.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "app-bank-account-settings",
  templateUrl: "./bank-account-settings.component.html",
  styleUrls: ["./bank-account-settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountSettingsComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject<void>();
  accounts: ClientBankAccountModel[] = [];
  disableBtnProp = "isRemoveButtonDisabled";

  constructor(private clientService: ClientService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.clientService
      .getClientBankAccounts()
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(accounts => {
        this.accounts = accounts;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  onDefaultAccountChange(accId: number) {
    this.accounts.forEach(x => x.isDefault = x.id === accId);
    this.clientService.setDefaultBankAccount(accId).subscribe(x => {}, err => alert(err));
  }

  deleteAccount(accId: number) {
    const acc = this.accounts.find(x => x.id === accId);
    Observable.of(accId)
      .pipe(
        tap(() => {
          acc[this.disableBtnProp] = true;
          this.cd.markForCheck();
        }),
        switchMap(id => this.clientService.deleteBankAccount(id))
      )
      .subscribe(
        newDefaultAccId => {
          const index = this.accounts.findIndex(x => x.id === accId);
          if (index === -1) {
            return;
          }
          this.accounts.splice(index, 1);
          if (newDefaultAccId) {
            this.accounts.find(x => x.id === newDefaultAccId).isDefault = true;
          }
          this.cd.markForCheck();
        },
        err => {
          acc[this.disableBtnProp] = false;
          this.cd.markForCheck();
          alert(err);
        });
  }
}
