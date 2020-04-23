import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckAwatingComponent } from "./check-awating.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "checking", component: CheckAwatingComponent, pathMatch: "full"}
      ])
  ],
  declarations: [CheckAwatingComponent],
  exports: [RouterModule]
})
export class CheckAwatingModule { }
