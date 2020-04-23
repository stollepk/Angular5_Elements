import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ApiService } from "../../shared/api.service";
import { takeUntil } from "rxjs/operators";
import { OrderType } from "../../../common/enums/order-type";
import { OrderClass } from "../../../common/enums/order-class";

@Component({
    selector: "app-create-order-dialog",
    templateUrl: "./create-order-dialog.component.html",
    styleUrls: ["./create-order-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderDialogComponent implements OnInit, OnDestroy {
    private ngUnsub = new Subject();
    private bestBid: number;
    private bestAsk: number;

    form: FormGroup;
    userId: string;

    get total() {
        if (!this.form) {
            return 0;
        }
        const formVal = this.form.value;
        let price = formVal.price;
        if (price === undefined) {
            price = this.injectedData.orderType === OrderType.Bid ? this.bestBid : this.bestAsk;
        }
        return price * formVal.quantity;
    }

    get orderTypeName() {
        return this.injectedData.orderType === OrderType.Bid ? "Buy" : "Sell";
    }

    get fee() {
        return this.injectedData.orderType === OrderType.Bid ? "3%" : "--";
    }

    private order(total) {
        return this.injectedData.orderType === OrderType.Bid ? total*0.97 : total;
    }

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateOrderDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private injectedData: any,
        private cd: ChangeDetectorRef,
        private api: ApiService) { }

    ngOnInit() {
        this.buildForm();
        this.initOnOrderClassChange();
        // this.hub
        //  .balance$
        //  .pipe(
        //    takeUntil(this.ngUnsub)
        //  )
        //  .subscribe(balanceDto => this.userId = balanceDto.userId);
        // this.hub
        //     .chartData$
        //     .pipe(
        //         takeUntil(this.ngUnsub)
        //     )
        //     .subscribe(chartData => {
        //         const data = chartData.entries;
        //         this.bestBid = data
        //             .filter(x => x.type === "bid")
        //             .map(x => x.price)
        //             .sort()
        //             .pop();

        //         this.bestAsk = data
        //             .filter(x => x.type === "ask")
        //             .map(x => x.price)
        //             .sort()
        //             .shift();
        //     });
    }

    ngOnDestroy() {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        const data = this.form.value;
        data["userId"] = this.userId;
        this.api
            .post("orders/create", data, { responseType: "text" })
            .subscribe(() => this.dialogRef.close(), err => alert(err));
    }

    private buildForm() {
        this.form = this.fb.group({
            "symbol": ["BTC_USD"],
            "orderType": [this.injectedData.orderType],
            "orderClass": [this.injectedData.orderClass || 1, Validators.required],
            "quantity": ["", Validators.required]
        });
        if (this.injectedData.price) {
            this.form.addControl("price", this.fb.control(this.injectedData.price, Validators.required));
        }
    }

    private initOnOrderClassChange() {
        this.form.get("orderClass")
            .valueChanges
            .pipe(
                takeUntil(this.ngUnsub)
            )
            .subscribe(
                val => {

                    if (val === OrderClass.Market && this.form.get("price")) {
                        this.form.removeControl("price");
                    }
                    if (val === OrderClass.Limit && !this.form.get("price")) {
                        this.form.addControl("price", this.fb.control("", Validators.required));
                    }
                },
                err => console.log(err));
    }
}
