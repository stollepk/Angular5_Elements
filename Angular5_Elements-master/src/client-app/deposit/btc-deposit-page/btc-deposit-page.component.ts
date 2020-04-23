import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {CryptoAddressService} from "../../../common/services/crypto-address.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "app-btc-deposit-page",
  templateUrl: "./btc-deposit-page.component.html",
  styleUrls: ["./btc-deposit-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtcDepositPageComponent implements OnInit, OnDestroy {
  private refresh$ = new BehaviorSubject(null);
  private ngUnsub = new Subject();

  lastAddress: string;
  isQuerying = false;

  addresses$ = this.refresh$
    .pipe(
      switchMap(() => this.addressService.getBtcAddresses()),
      tap(adressModels => {
        if (adressModels.length === 0) {
          return;
        }
        this.lastAddress = adressModels[0].address;
        this.cd.markForCheck();
      })
    );

  constructor(private addressService: CryptoAddressService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  generateAddress() {
    this.isQuerying = true;
    this.addressService
      .createBtcAddress()
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(
        address => {
          this.isQuerying = false;
          this.refresh$.next(null);
          this.cd.markForCheck();
        },
        err => {
          alert(err);
          this.isQuerying = false;
          this.cd.markForCheck();
        });
  }

}
