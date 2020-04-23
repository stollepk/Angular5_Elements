import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { filter, takeUntil } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material";
import { ElementsApiService } from "../../../common/services/elements-api.service";
import { OrderService } from "../../../common/services/orders.service";
import { OrderDto } from "../../shared/models/order-dto";
import { OrderStatus } from "../../../common/enums/order-status";
import { TransactionRouter } from "../../shared/transaction-router";

@Component({
    selector: "app-user-orders",
    templateUrl: "./user-orders.component.html",
    styleUrls: ["./user-orders.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrdersComponent implements OnInit {
    private ngUnsub = new Subject();

    notFilledOrdersDataSource = new MatTableDataSource([]);
    filledOrdersDataSource = new MatTableDataSource([]);
    rejectedOrdersDataSource = new MatTableDataSource([]);

    isActiveStatus = status => status === OrderStatus.New || status === OrderStatus.PartialFill || status === OrderStatus.Pending;
    isFilledStatus = status => status === OrderStatus.Filled;
    isRejectedStatus = status => !this.isActiveStatus(status) && !this.isFilledStatus(status);

    constructor(
        private txRouter: TransactionRouter,
        private orderService: OrderService,
        private api: ElementsApiService,
        private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.orderService
            .getLastOrders()
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(orders => {
                this.notFilledOrdersDataSource = new MatTableDataSource(orders.filter(o => this.isActiveStatus(o.status)));
                this.filledOrdersDataSource = new MatTableDataSource(orders.filter(o => this.isFilledStatus(o.status)));
                this.rejectedOrdersDataSource = new MatTableDataSource(orders.filter(o => this.isRejectedStatus(o.status)));
                this.subscribeToOrderChanges();
            });
    }

    private subscribeToOrderChanges() {
        this.txRouter
            .orderChanges$
            .pipe(
                filter(x => !!x),
                takeUntil(this.ngUnsub)
            )
            .subscribe(order => {
                let notFilledOrders = this.notFilledOrdersDataSource.data;
                const filledOrders = this.filledOrdersDataSource.data;
                const rejectedOrders = this.rejectedOrdersDataSource.data;
                //if (!Array.isArray(orders)) {
                //  orders = [orders];
                //}
                //orders
                //  .reverse()
                //  .map(order => {
                notFilledOrders = this.updateNotFilledOrders(notFilledOrders, order);
                if (this.isFilledStatus(order.status)) {
                    filledOrders.unshift(order);
                }
                if (this.isRejectedStatus(order.status)) {
                    rejectedOrders.unshift(order);
                }
                //});
                this.notFilledOrdersDataSource = new MatTableDataSource(notFilledOrders);
                this.filledOrdersDataSource = new MatTableDataSource(filledOrders);
                this.rejectedOrdersDataSource = new MatTableDataSource(rejectedOrders);
                this.cd.markForCheck();
            });
    }

    private updateNotFilledOrders(notFilledOrders: OrderDto[], order: OrderDto) {
        const index = notFilledOrders.findIndex(x => x.id === order.id);
        if (index === -1 && this.isActiveStatus(order.status)) {
            if (notFilledOrders.length >= 10) {
                notFilledOrders.pop();
            }
            notFilledOrders.unshift(order);
        } else if (index !== -1 && this.isActiveStatus(status)) {
            notFilledOrders.splice(index, 1);
        } else {
            notFilledOrders[index] = order;
        }

        return notFilledOrders;
    }
}
