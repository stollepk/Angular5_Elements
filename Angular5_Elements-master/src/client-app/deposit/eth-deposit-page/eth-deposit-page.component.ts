import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CryptoAddressService} from "../../../common/services/crypto-address.service";
import {switchMap, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: "app-eth-deposit-page",
  templateUrl: "./eth-deposit-page.component.html",
  styleUrls: ["./eth-deposit-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EthDepositPageComponent implements OnInit, OnDestroy {
  private refresh$ = new BehaviorSubject(null);
  private ngUnsub = new Subject();

  lastAddress: string;
  isQuerying = false;

  addresses$ = this.refresh$
    .pipe(
      switchMap(() => this.addressService.getEthAddresses()),
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
      .createEthAddress()
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
