import { NgModule } from "@angular/core";
import { UserOrdersComponent } from "./user-orders.component";
import { SharedModule } from "../../shared/shared.module";
import { MatTableModule, MatTabsModule, MatCardModule } from "@angular/material";
import { OrdersTableComponent } from "./orders-table/orders-table.component";

@NgModule({
    imports: [
        SharedModule,
        MatTableModule,
        MatTabsModule,
        MatCardModule
    ],
    declarations: [UserOrdersComponent, OrdersTableComponent],
    exports: [UserOrdersComponent]
})
export class UserOrdersModule { }
