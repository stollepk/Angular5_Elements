import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderType} from "../../../common/enums/order-type";
import {OrderClass} from "../../../common/enums/order-class";
import {OrderService} from "../../../common/services/orders.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {SymbolService} from "../../shared/services/symbol.service";

@Component({
  selector: "app-trade-form",
  templateUrl: "./trade-form.component.html",
  styleUrls: ["./trade-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeFormComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject();
  private feeRate = 0.03;
  form: FormGroup;
  isSubmitting = false;

  get isPriceVisible() {
    return this.form.get("orderClass").value == 2;
  }

  get isBuy() {
    return this.form.get("orderType").value == 1;
  }

  get isSell() {
    return this.form.get("orderType").value == 2;
  }

  get baseAsset() {
    return this.form.get("symbol").value.split("_").shift();
  }

  get quoteAsset() {
    return this.form.get("symbol").value.split("_").pop();
  }

  get totalPrice() {
    const price = parseFloat(this.form.get("price").value);
    const qty = parseFloat(this.form.get("quantity").value);
    return price * qty;
  }

  get fee() {
    return this.totalPrice * this.feeRate;
  }

  get orderPrice() {
    return this.totalPrice * (1 - this.feeRate);
  }

  get isFormValid() {
    let isPriceValid = true;
    if (this.isPriceVisible) {
      isPriceValid = parseFloat(this.form.get("price").value) > 0;
    }
    const isQtyValid = this.form.get("quantity").value > 0;

    return this.form.valid && isPriceValid && isQtyValid;
  }

  constructor(
    private fb: FormBuilder,
    private symbolService: SymbolService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.form = this.fb.group({
      "symbol": this.fb.control("BTC_USD", Validators.required),
      "orderType": this.fb.control(OrderType.Bid, Validators.required),
      "orderClass": this.fb.control(OrderClass.Market, Validators.required),
      "price": this.fb.control(0),
      "quantity": this.fb.control(0, Validators.required),
      "clientId": this.fb.control(0, Validators.required),
    });
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  createOrder() {
    if (!this.isFormValid) {
      return;
    }

    if (!this.isPriceVisible) {
      this.form.get("price").setValue(0);
    }
    console.log(this.form.value);

    this.isSubmitting = true;
    this.orderService
      .placeOrder(this.form.value)
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(
        res => {
          this.resetForm();
          this.isSubmitting = false;
        },
        err => {
          this.isSubmitting = false;
          alert(err);
        }
      );
  }

  onSymbolChange($event) {
    const symbol = this.form.get("symbol").value;
    this.symbolService.setSymbol(symbol);
  }

  private resetForm()
  {
    this.form.get("price").setValue(0);
    this.form.get("quantity").setValue(0);
  }

}
