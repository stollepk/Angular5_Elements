import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CryptoOrderService} from "../../../common/services/crypto-order.service";
import {ClientService} from "../../../common/services/client.service";
import {BankOrderStatus} from "../../../common/enums/bank-order-status";
import {switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: "app-eth-withdrawal-page",
  templateUrl: "./eth-withdrawal-page.component.html",
  styleUrls: ["./eth-withdrawal-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EthWithdrawalPageComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject();
  private refreshOrders$ = new BehaviorSubject(null);

  isFormInitialized = false;
  form: FormGroup;
  orderStatuses = BankOrderStatus;

  orders$ = this.refreshOrders$
    .pipe(
      switchMap(() => this.clientService.getClientCryptoWithdrawals("ETH"))
    );

  constructor(
    private clientService: ClientService,
    private cryptoOrderService: CryptoOrderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      "address": this.fb.control("", Validators.required),
      "amount": this.fb.control("", Validators.required),
      "asset": this.fb.control("ETH", Validators.required),
      "clientId": this.fb.control(0, Validators.required),
    });
    this.isFormInitialized = true;
    this.refreshOrders$.next(null);
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  createOrder() {
    if (this.form.invalid) {
      return;
    }
    this.cryptoOrderService
      .placeWithdrawalOrder(this.form.value)
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(
        res => {
          this.refreshOrders$.next(null);
          this.resetForm();
        },
        err => alert(err));
  }

  resetForm() {
    this.form.get("amount").reset();
  }
}
