import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material";
import { SharedModule } from "../../shared.module";
import { CurrencySelectorComponent } from "./currency-selector.component";

@NgModule({
  imports: [
    SharedModule,
    MatSelectModule
  ],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule { }
