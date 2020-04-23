import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsLayoutComponent } from "./settings-layout/settings-layout.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "../shared/components/header/header.module";

const ROUTES: Routes = [
  {path: "settings", component: SettingsLayoutComponent, children: [
      {path: "change-password", component: ChangePasswordComponent},
      {path: "", pathMatch: "full", redirectTo: "change-password"}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [SettingsLayoutComponent, ChangePasswordComponent]
})
export class SettingsModule { }
