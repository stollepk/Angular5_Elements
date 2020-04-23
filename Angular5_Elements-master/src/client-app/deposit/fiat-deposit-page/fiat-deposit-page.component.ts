import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {ClientService} from "../../../common/services/client.service";
import {Subject} from "rxjs/Subject";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankOrderType} from "../../../common/enums/bank-order-type";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BankOrderService} from "../../../common/services/bank-order.service";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {Observable} from "rxjs/Observable";
import {BankOrderPublicModel} from "../../../common/models/bank-order.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BankOrderStatus} from "../../../common/enums/bank-order-status";

@Component({
  selector: "app-fiat-deposit-page",
  templateUrl: "./fiat-deposit-page.component.html",
  styleUrls: ["./fiat-deposit-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiatDepositPageComponent implements OnInit, OnDestroy {
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
      switchMap(() => this.clientService.getClientDeposits())
    );

  constructor(
    private clientService: ClientService,
    private bankOrderService: BankOrderService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.form = this.fb.group({
      "clientBankAccountId": this.fb.control("", Validators.required),
      "amount": this.fb.control("", Validators.required),
      "type": this.fb.control(BankOrderType.Deposit, Validators.required),
      "asset": this.fb.control("USD", Validators.required)
    });
    this.isFormInitialized = true;
    this.refreshOrders$.next(null);
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  createOrder(content) {
    if (this.form.invalid) {
      return;
    }
    this.bankOrderService
      .placeOrder(this.form.value)
      .pipe(
        switchMap(refs => {
          this.reference = `${refs.clientReference}, order reference ${refs.orderReference}`;
          this.refreshOrders$.next(null);
          return fromPromise(this.openDialog(content));
        }),
        takeUntil(this.ngUnsub)
      )
      .subscribe(res => {}, err => alert(err));
  }

  openDialog(content): Promise<any> {
    return this.modalService
      .open(content)
      .result
      .then(
        (result) => this.resetForm(),
        (reason) => this.resetForm()
      );
  }

  resetForm() {
    this.form.get("amount").reset();
  }

}
