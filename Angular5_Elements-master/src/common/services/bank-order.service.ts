import {ElementsApiService} from "./elements-api.service";
import {Observable} from "rxjs/Observable";

export class BankOrderService {
  constructor(private api: ElementsApiService) {}

  placeOrder(order): Observable<any> {
    return this.api.post("fiat/order/create", order);
  }
}
