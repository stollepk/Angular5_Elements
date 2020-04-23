import { NgModule } from "@angular/core";
import { FiatWithdrawalPageComponent } from "./fiat-withdrawal-page/fiat-withdrawal-page.component";
import { BtcWithdrawalPageComponent } from "./btc-withdrawal-page/btc-withdrawal-page.component";
import { EthWithdrawalPageComponent } from "./eth-withdrawal-page/eth-withdrawal-page.component";
import {QRCodeModule} from "angularx-qrcode";
import {HeaderModule} from "../shared/components/header/header.module";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FooterModule} from "../shared/components/footer/footer.module";
import {ReactiveFormsModule} from "@angular/forms";
import { WithdrawalPageLayoutComponent } from "./withdrawal-page-layout/withdrawal-page-layout.component";

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
    QRCodeModule,
    RouterModule.forChild([
      {path: "withdrawal", component: WithdrawalPageLayoutComponent, children: [
          {path: "fiat", component: FiatWithdrawalPageComponent},
          {path: "btc", component: BtcWithdrawalPageComponent},
          {path: "eth", component: EthWithdrawalPageComponent},
          {path: "", redirectTo: "fiat", pathMatch: "full"}
        ]}
    ])
  ],
  declarations: [FiatWithdrawalPageComponent, BtcWithdrawalPageComponent, EthWithdrawalPageComponent, WithdrawalPageLayoutComponent]
})
export class WithdrawalModule { }
