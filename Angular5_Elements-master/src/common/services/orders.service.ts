import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OrderModel } from "../models/order.model";
import { ElementsApiService } from "./elements-api.service";

@Injectable()
export class OrderService {
  constructor(private api: ElementsApiService) {}

  getLastOrders(): Observable<OrderModel[]> {
    return this.api.get("orders/get-last");
  }

  placeOrder(order): Observable<any> {
    return this.api.post("orders/create", order);
  }

  getOrders(): Observable<OrderModel[]> {
    return this.api.get("orders/list-tmp");
  }
}
