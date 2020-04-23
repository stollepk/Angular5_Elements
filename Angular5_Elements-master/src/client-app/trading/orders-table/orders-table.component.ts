import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {OrderService} from "../../../common/services/orders.service";
import {OrderModel} from "../../../common/models/order.model";
import {OrderClass} from "../../../common/enums/order-class";
import {OrderType} from "../../../common/enums/order-type";
import {DecimalPipe} from "@angular/common";
import {TransactionRouter} from "../../shared/transaction-router";

@Component({
  selector: "app-orders-table",
  templateUrl: "./orders-table.component.html",
  styleUrls: ["./orders-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTableComponent implements OnInit {
  private allOrders: OrderModel[] = [];

  isCollapsed = true;
  orderClassEnum = OrderClass;
  orderTypeEnum = OrderType;

  get orders() {
    return this.isCollapsed
      ? this.allOrders.filter((val, i) => i < 5)
      : this.allOrders;
  }

  constructor(
    private orderService: OrderService,
    private decimalPipe: DecimalPipe,
    private txRouter: TransactionRouter,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.orderService
      .getOrders()
      .subscribe(orders => {
        this.allOrders = orders;
        this.cd.markForCheck();
      });

    this.txRouter.orderChanges$.subscribe(newOrder => {
      const index = this.allOrders.findIndex(x => x.id == newOrder.id);
      if (index === -1) {
        this.allOrders.unshift(newOrder);
      } else {
        this.allOrders.splice(index, 1, newOrder);
      }
      this.cd.markForCheck();
    });
  }

  formatPrice(price) {
    return price > 0 ? `$${this.decimalPipe.transform(price, "1.2-2")}` : "-";
  }

  showAll($event) {
    $event.preventDefault();
    this.isCollapsed = false;
  }

  collapse($event) {
    $event.preventDefault();
    this.isCollapsed = true;
  }

}
