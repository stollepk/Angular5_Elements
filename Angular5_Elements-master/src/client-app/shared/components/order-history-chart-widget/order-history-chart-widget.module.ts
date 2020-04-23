import { NgModule } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";
import { MatGridListModule, MatDividerModule, MatIconModule } from "@angular/material";
import { OrderHistoryChartWidgetComponent } from "./order-history-chart-widget.component";

@NgModule({
    imports: [
        NgxEchartsModule,
        MatGridListModule,
        MatDividerModule,
        MatIconModule
    ],
    declarations: [OrderHistoryChartWidgetComponent],
    exports: [OrderHistoryChartWidgetComponent]
})
export class OrderHistoryChartWidgetModule { }
