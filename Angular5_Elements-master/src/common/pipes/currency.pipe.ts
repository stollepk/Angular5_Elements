import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "currency"})
export class CurrencyPipe implements PipeTransform {
  private assetFormats = {
    "USD": "1.2-2",
    "BTC": "1.6-6"
  };

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any, ...args: any[]): any {
    const asset = args[0];
    const format = this.assetFormats[asset];
    if (format === undefined) {
      throw new Error("Unknown asset type");
    }

    return this.decimalPipe.transform(value, format);
  }

}
