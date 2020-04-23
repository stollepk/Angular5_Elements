import { NgModule } from "@angular/core";
import { MatCardModule, MatListModule } from "@angular/material";
import { SharedModule } from "../../shared/shared.module";
import { BalancePanelComponent } from "./balance-panel.component";

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatListModule
  ],
  declarations: [BalancePanelComponent],
  exports: [BalancePanelComponent]
})
export class BalancePanelModule {}
