import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientsListComponent } from "./clients-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../../../shared/components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    HeaderModule
  ],
  declarations: [ClientsListComponent]
})
export class ClientsListModule { }
