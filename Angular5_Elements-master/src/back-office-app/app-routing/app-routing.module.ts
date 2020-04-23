import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "../shared/auth-guard.service";

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent,
    canActivate: [AuthGuard] // TODO add Verify Guard
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
