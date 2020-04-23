import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RecentTradeStats } from "../models/recent-trade-stats.model";
import { ElementsApiService } from "./elements-api.service";

@Injectable()
export class TradeDataService {
  constructor(private api: ElementsApiService) {}

  getRecentStats(): Observable<RecentTradeStats> {
    return this.api.get("trades/recent-stats");
  }
}
