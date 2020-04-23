import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginTwoFactorComponent } from "./login-two-factor/login-two-factor.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { RecoverPasswordComponent } from "./recover-password/recover-password.component";
import { RecoverCodeComponent } from "./recover-code/recover-code.component";
import { AuthComponent } from "./auth.component";
import {ShowHidePasswordModule} from "ngx-show-hide-password";

const appRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            }, {
                path: 'login',
                component: LoginComponent
            }, {
                path: 'register',
                component: RegistrationComponent
            }, {
                path: 'login-two-factor',
                component: LoginTwoFactorComponent
            }, {
                path: 'recover-password',
                component: RecoverPasswordComponent
            }, {
                path: 'recover-code',
                component: RecoverCodeComponent
            }, {
                path: 'reset-password',
                component: ResetPasswordComponent
            }
        ]
    },
]

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ShowHidePasswordModule,
        RouterModule.forRoot(
            appRoutes,
        ),
    ],
    declarations: [AuthComponent, LoginComponent, RegistrationComponent, LoginTwoFactorComponent, RecoverPasswordComponent, RecoverCodeComponent, ResetPasswordComponent],
    exports: [RouterModule]
})
export class AuthModule { }
