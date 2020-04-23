import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "../../common/auth-guard.service";
import { VerifyGuard } from "../shared/verify-guard.service";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "",
                    pathMatch: "full",
                    component: DashboardComponent,
                    canActivate: [AuthGuard, VerifyGuard],
                    runGuardsAndResolvers: "always"
                }
            ],
            { onSameUrlNavigation: "reload" }
        )
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
