import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BankOrderStatus} from "../../../common/enums/bank-order-status";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {BankOrderService} from "../../../common/services/bank-order.service";
import {ClientService} from "../../../common/services/client.service";
import {BankOrderType} from "../../../common/enums/bank-order-type";

@Component({
  selector: "app-fiat-withdrawal-page",
  templateUrl: "./fiat-withdrawal-page.component.html",
  styleUrls: ["./fiat-withdrawal-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiatWithdrawalPageComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject();
  private refreshOrders$ = new BehaviorSubject(null);

  isFormInitialized = false;
  form: FormGroup;
  reference: string;
  orderStatuses = BankOrderStatus;

  accounts$ = this.clientService
    .getClientBankAccounts()
    .pipe(
      tap(accounts => {
        if (accounts.length === 0) {
          return;
        }
        const defaultAcc = accounts.find(x => x.isDefault);
        this.form.get("clientBankAccountId").setValue(defaultAcc.id);
      }),
      takeUntil(this.ngUnsub)
    );

  orders$ = this.refreshOrders$
    .pipe(
      switchMap(() => this.clientService.getClientWithdrawals())
    );

  constructor(
    private clientService: ClientService,
    private bankOrderService: BankOrderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      "clientBankAccountId": this.fb.control("", Validators.required),
      "amount": this.fb.control("", Validators.required),
      "type": this.fb.control(BankOrderType.Withdrawal, Validators.required),
      "asset": this.fb.control("USD", Validators.required)
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
    this.bankOrderService
      .placeOrder(this.form.value)
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
