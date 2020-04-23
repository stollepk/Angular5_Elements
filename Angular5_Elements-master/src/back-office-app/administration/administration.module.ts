import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationLayoutComponent } from "./administration-layout/administration-layout.component";
import { AccountCreationComponent } from "./account-creation/account-creation.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../shared/components/header/header.module";

const ROUTES: Routes = [
  {path: "administration", component: AdministrationLayoutComponent, children: [
      {path: "create-account", component: AccountCreationComponent},
      {path: "", pathMatch: "full", redirectTo: "create-account"}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [AdministrationLayoutComponent, AccountCreationComponent]
})
export class AdministrationModule { }
