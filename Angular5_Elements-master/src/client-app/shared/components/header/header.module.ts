import { NgModule } from "@angular/core";
import { DropdownModule } from "angular-custom-dropdown";
import { HeaderComponent } from "./header.component";
import { SharedModule } from "../../shared.module";
import { CreateOrderDialogModule } from "../../../dialog/create-order-dialog/create-order-dialog.module";
import { CurrencySelectorModule } from "../currency-selector/currency-selector.module";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        SharedModule,
        DropdownModule,
        CreateOrderDialogModule,
        CurrencySelectorModule,
        RouterModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
