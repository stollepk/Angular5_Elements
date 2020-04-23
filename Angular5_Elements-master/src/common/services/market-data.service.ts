import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { PriceRange, MarketChartData } from "../models/market-chartdata.model";
import { ElementsApiService } from "./elements-api.service";
import {s} from "@angular/core/src/render3";

@Injectable()
export class MarketDataService {
    constructor(private api: ElementsApiService) { }

    getMarketRange(symbol): Observable<PriceRange> {
        return this.api.get("market-data/price-range?symbol=" + symbol);
    }

    getLastPrice(symbol) {
        return this.api.get("market-data/last-price?symbol=" + symbol);
    }

    getMarketChartData(symbol): Observable<MarketChartData> {
        return this.api.get("market-data/chart-data?symbol=" + symbol);
    }

    get24hDiff(symbol): Observable<any> {
      return this.api.get("market-data/24h-price-diff", {params: {symbol: symbol}});
    }

    getSpread(symbol): Observable<any> {
      return this.api.get("market-data/spread", {params: {symbol: symbol}});
    }

    getLastWeekPrice(symbol): Observable<any> {
      return this.api.get("market-data/last-week-price-history", {params: {symbol: symbol}});
    }

    getDashboardData(symbol) {
      return this.api.get("market-data/dashboard-data", {params: {symbol: symbol}});
    }
}
