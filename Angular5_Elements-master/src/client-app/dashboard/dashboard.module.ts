import { NgModule } from "@angular/core";
import { BalancePanelModule } from "./balance-panel/balance-panel.module";
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { MatGridListModule, MatListModule, MatToolbarModule, MatDialogModule } from "@angular/material";
import { UserOrdersModule } from "./user-orders/user-orders.module";
import { HistoryDataModule } from "./history-data/history-data.module";
import { HeaderModule } from "../shared/components/header/header.module";
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
    imports: [
        SharedModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        HeaderModule,
        UserOrdersModule,
        HistoryDataModule,
        BalancePanelModule,
        NgxEchartsModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
