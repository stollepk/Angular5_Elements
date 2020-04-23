import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { PriceRange } from "../../../common/models/recent-trade-stats.model";
import { TradeDataService } from "../../../common/services/trade-data.service";
import { TradePublicData } from "../../../common/models/trade-public-data.model";
import "rxjs/add/observable/interval";
import { DecimalPipe } from "@angular/common";
import { MatDialog } from "@angular/material";
import { TransactionRouter } from "../../shared/transaction-router";

@Component({
    selector: "app-history-data",
    templateUrl: "./history-data.component.html",
    styleUrls: ["./history-data.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDataComponent implements OnInit, AfterViewInit, OnDestroy {
    private ngUnsub = new Subject();
    private bidBgColor = "rgba(54, 162, 235, 0.2)";
    private askBgColor = "rgba(255, 99, 132, 0.2)";

    trades: TradePublicData[] = [];
    lastPrice: number;
    priceRange = new PriceRange();

    constructor(
        private tradeDataService: TradeDataService,
        private cd: ChangeDetectorRef,
        private txRouter: TransactionRouter,
        private dialog: MatDialog,
        private decimalPipe: DecimalPipe) { }

    ngAfterViewInit() {

    }

    ngOnInit() {
        this.tradeDataService
            .getRecentStats()
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(data => {
                this.lastPrice = data.lastPrice;
                this.priceRange = data.priceRange;
                this.trades = data.lastTrades;
                this.cd.markForCheck();
            });
        this.txRouter
            .newTrades$
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(newTrades => {
                newTrades.reverse().map(t => {
                    if (this.trades.length >= 15) {
                        this.trades.pop();
                    }
                    this.trades.unshift(t);
                });
                if (newTrades[0]) {
                    this.lastPrice = newTrades[0].price;
                }
                this.cd.markForCheck();
            });

    }

    ngOnDestroy() {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }

}
