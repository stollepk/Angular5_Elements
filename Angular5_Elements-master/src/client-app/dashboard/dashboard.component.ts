import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {MarketDataService} from "../../common/services/market-data.service";
import * as moment from "moment";
import {ClientService} from "../../common/services/client.service";
import {TransactionType} from "../../common/enums/transaction-type";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  chartOptions;
  transactions = [];
  txTypeEnum = TransactionType;
  clientName: string;
  dashboardData: any = {};
  isGrow: boolean;
  priceDiff: number;
  priceDiffPercentage: number;
  marketPrice: number;
  volume: number;

  constructor(
    private marketDataService: MarketDataService,
    private clientService: ClientService,
    private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.marketDataService
      .getLastWeekPrice("BTC_USD")
      .subscribe(data => {
        this.buildChartOptions(data);
        this.cd.markForCheck();
      });
    this.clientService
      .getTransactionHistory()
      .subscribe(data => {
        this.transactions = data;
      });
    this.clientService
      .getClientIdentity()
      .subscribe(identity => {
        this.clientName = identity.personalParticularsModel.firstName;
      });

    this.marketDataService
      .getDashboardData("BTC_USD")
      .subscribe(data => {
        this.dashboardData = data;
        const diff = data.priceDiff;
        this.marketPrice = data.marketPrice;
        this.volume = data.volume;
        this.isGrow = diff.now > diff.dayAgo;
        this.priceDiff = Math.abs(diff.now - diff.dayAgo);
        this.priceDiffPercentage = 0;
        if (diff.dayAgo > 0 && diff.dayAgo > 0) {
          this.priceDiffPercentage = diff.now / diff.dayAgo - 1;
        }
      });
  }

  private buildChartOptions(data) {
    const prices = data.map(x => x.price);
    const minY = Math.min.apply(null, prices) - 100;
    this.chartOptions = {
      xAxis: {
        type: "category",
        data: data.map(x => moment(x.dataPoint).format("dd-MM hh:mm "))
      },
      yAxis: {
        min: minY,
        type: "value"
      },
      series: [{
        data: prices,
        type: "line"
      }]
    };
  }

}
