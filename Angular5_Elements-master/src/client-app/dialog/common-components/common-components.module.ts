import { forwardRef, NgModule } from "@angular/core";
import { OrderClassSelectorComponent } from "./order-class-selector/order-class-selector.component";
import { SharedModule } from "../../shared/shared.module";
import { MatFormFieldModule, MatSelectModule } from "@angular/material";

const components = [
  forwardRef(() => OrderClassSelectorComponent)
];

@NgModule({
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [components],
  exports: [components]
})
export class CommonDialogComponentsModule { }
