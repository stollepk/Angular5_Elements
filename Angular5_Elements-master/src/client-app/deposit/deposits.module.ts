import { NgModule } from "@angular/core";
import { DepositPageLayoutComponent } from "./deposit-page-layout/deposit-page-layout.component";
import { FiatDepositPageComponent } from "./fiat-deposit-page/fiat-deposit-page.component";
import { BtcDepositPageComponent } from "./btc-deposit-page/btc-deposit-page.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../shared/components/header/header.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FooterModule} from "../shared/components/footer/footer.module";
import {QRCodeModule} from "angularx-qrcode";
import { EthDepositPageComponent } from "./eth-deposit-page/eth-deposit-page.component";

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
    QRCodeModule,
    RouterModule.forChild([
      {path: "deposit", component: DepositPageLayoutComponent, children: [
          {path: "fiat", component: FiatDepositPageComponent},
          {path: "btc", component: BtcDepositPageComponent},
          {path: "eth", component: EthDepositPageComponent},
          {path: "", redirectTo: "fiat", pathMatch: "full"}
      ]}
    ])
  ],
  declarations: [DepositPageLayoutComponent, FiatDepositPageComponent, BtcDepositPageComponent, EthDepositPageComponent]
})
export class DepositsModule { }
