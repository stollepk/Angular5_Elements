export class PriceRange {
    min: number;
    max: number;
}

export class MarketChartData {
    symbol: string;
    date: string;
    entries: EntrieData[];
}

export class EntrieData {
    type: string;
    total: number;
    price: number;
}
