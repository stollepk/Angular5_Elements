import { NgModule } from "@angular/core";
import { CreateOrderDialogComponent } from "./create-order-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatDividerModule } from "@angular/material";
import { CommonDialogComponentsModule } from "../common-components/common-components.module";

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    CommonDialogComponentsModule
  ],
  declarations: [CreateOrderDialogComponent],
  entryComponents: [CreateOrderDialogComponent],
  exports: [CreateOrderDialogComponent]
})
export class CreateOrderDialogModule { }
