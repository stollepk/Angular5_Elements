import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { MatButtonModule, MatGridListModule } from "@angular/material";
import { DepositsModule } from "./deposits/deposits.module";
import {ClientsManagementModule} from "./clients-management/clients-management.module";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {HeaderModule} from "../shared/components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    DepositsModule,
    ClientsManagementModule,
    AppRoutingModule,
    HeaderModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
