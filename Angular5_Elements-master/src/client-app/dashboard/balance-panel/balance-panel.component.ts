import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { AuthDataStorage } from "../../../common/auth-data.storage";
import { ClientService } from "../../../common/services/client.service";
import { ClientBalanceModel } from "../../../common/models/client-balance.model";
import { TransactionRouter } from "../../shared/transaction-router";

@Component({
  selector: "app-balance-panel",
  templateUrl: "./balance-panel.component.html",
  styleUrls: ["./balance-panel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalancePanelComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject();

  balanceData: ClientBalanceModel[] = [];
  userName$: Observable<string>;

  constructor(
    private clientService: ClientService,
    private txRouter: TransactionRouter,
    private cd: ChangeDetectorRef,
    private authDataStorage: AuthDataStorage) {
  }

  ngOnInit() {
    this.authDataStorage
      .getClientId()
      .pipe(
        switchMap(clientId => this.clientService.getBalance(clientId)),
        takeUntil(this.ngUnsub)
      )
      .subscribe(data => {
        this.balanceData = data;
        this.subscribeToBalanceChanges();
        this.cd.markForCheck();
      });
    this.userName$ = this.authDataStorage
      .getClientId()
      .pipe(
        switchMap(clientId => this.clientService.getClientPublicData(clientId)),
        map(x => `${x.firstName} ${x.lastName}`),
        takeUntil(this.ngUnsub)
      );
  }

  private subscribeToBalanceChanges() {
    this.txRouter
      .balanceChanges$
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(change => {
        const i = this.balanceData.findIndex(x => x.asset === change.asset);
        this.balanceData[i].balance += change.balanceChange;
        this.balanceData[i].frozenBalance += change.frozenBalanceChange;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
