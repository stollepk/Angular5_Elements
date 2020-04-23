import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class SymbolService {
    symbol = new BehaviorSubject<string>("BTC_USD");

    setSymbol(symbol: string) {
      this.symbol.next(symbol);
    }
  }
