import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material";
import { SharedModule } from "../../shared/shared.module";
import { HistoryDataComponent } from "./history-data.component";
import { CreateOrderDialogModule } from "../../dialog/create-order-dialog/create-order-dialog.module";

@NgModule({
    imports: [
        SharedModule,
        CreateOrderDialogModule,
        MatCardModule,
    ],
    declarations: [HistoryDataComponent],
    exports: [HistoryDataComponent]
})
export class HistoryDataModule { }
