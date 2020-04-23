import { NgModule } from "@angular/core";
import { PersonalParticularsComponent } from "./personal-particulars/personal-particulars.component";
import { SettingsLayoutComponent } from "./settings-layout/settings-layout.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HeaderModule} from "../shared/components/header/header.module";
import { BankAccountSettingsComponent } from "./bank-account-settings/bank-account-settings.component";
import { NotificationSettingsComponent } from "./notification-settings/notification-settings.component";
import {IdentityModule} from "../onboarding/identity/identity.module";
import {AddBankModule} from "../onboarding/add-bank/add-bank.module";
import {AddBankComponent} from "../onboarding/add-bank/add-bank.component";
import { AddBankSettingsFormComponent } from "./add-bank-settings-form/add-bank-settings-form.component";

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    IdentityModule,
    AddBankModule,
    RouterModule.forChild([
      {path: "settings", component: SettingsLayoutComponent, children: [
          {path: "profile", component: PersonalParticularsComponent},
          {path: "bank-accounts", component: BankAccountSettingsComponent},
          {path: "bank-accounts/add", component: AddBankSettingsFormComponent},
          {path: "notifications", component: NotificationSettingsComponent},
          {path: "", pathMatch: "full", redirectTo: "profile"}
      ]}
    ])
  ],
  declarations: [PersonalParticularsComponent, SettingsLayoutComponent, BankAccountSettingsComponent, NotificationSettingsComponent, AddBankSettingsFormComponent]
})
export class SettingsModule { }
