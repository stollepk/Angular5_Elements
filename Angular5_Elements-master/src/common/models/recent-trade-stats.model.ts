import { TradePublicData } from "./trade-public-data.model";

export class RecentTradeStats {
  lastPrice: number;
  lastTrades: TradePublicData[];
  priceRange: PriceRange;
}

export class PriceRange {
  min: number;
  max: number;
}
