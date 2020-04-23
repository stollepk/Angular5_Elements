import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
// import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }, {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        //SharedModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)],
    declarations: [
        AuthComponent,
        LoginComponent
    ]
})
export class AuthModule { }