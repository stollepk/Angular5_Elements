import { NgModule } from "@angular/core";
import { TradingPageLayoutComponent } from "./trading-page-layout/trading-page-layout.component";
import { TradeFormComponent } from "./trade-form/trade-form.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import { ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "../shared/components/header/header.module";
import {FooterModule} from "../shared/components/footer/footer.module";
import {OrderHistoryChartWidgetModule} from "../shared/components/order-history-chart-widget/order-history-chart-widget.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { OrdersTableComponent } from "./orders-table/orders-table.component";

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
    OrderHistoryChartWidgetModule,
    RouterModule.forChild([
      {path: "trading", component: TradingPageLayoutComponent}
    ])
  ],
  declarations: [TradingPageLayoutComponent, TradeFormComponent, OrdersTableComponent]
})
export class TradingModule { }
