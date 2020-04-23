import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { OrderStatus } from "../../../../common/enums/order-status";

@Component({
  selector: "app-orders-table",
  templateUrl: "./orders-table.component.html",
  styleUrls: ["./orders-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTableComponent implements OnInit {
  @Input() dataSource = new MatTableDataSource([]);

  displayedColumns = [
    "symbol",
    "orderType",
    "orderClass",
    "status",
    "createdAt",
    "quantity",
    "filled",
    "price"
  ];

  orderTypeEnum = {
    1: "Bid",
    2: "Ask"
  };

  orderClassEnum = {
    1: "Market",
    2: "Limit"
  };

  orderStatusEnum = OrderStatus;

  constructor() { }

  ngOnInit() {
  }

}
