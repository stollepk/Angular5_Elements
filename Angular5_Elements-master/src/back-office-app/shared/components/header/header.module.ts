import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import {RouterModule} from "@angular/router";
import {DropdownModule} from "angular-custom-dropdown";
import {SharedModule} from "../../shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DropdownModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
