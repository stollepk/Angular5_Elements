import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ClientsListModule} from "./clients-list/clients-list.module";
import {ClientDetailsModule} from "./client-details/client-details.module";
import {ClientsListComponent} from "./clients-list/clients-list.component";
import {ClientDetailsComponent} from "./client-details/client-details.component";
import {RouterModule} from "@angular/router";

const ROUTES = [
  {path: "clients", component: ClientsListComponent},
  {path: "clients/:id", component: ClientDetailsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    ClientsListModule,
    ClientDetailsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [],
  exports: []
})
export class ClientsManagementModule { }
