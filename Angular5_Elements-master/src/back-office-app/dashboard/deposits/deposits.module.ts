import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
import { DepositsListComponent } from "./deposits-list/deposits-list.component";
import { DepositDetailsComponent } from "./deposit-details/deposit-details.component";
import { CommonModule } from "@angular/common";
import {HeaderModule} from "../../shared/components/header/header.module";

const DEPOSITS_ROUTES: Routes = [
    {
        path: "deposits",
        children: [
            {
                path: '',
                component: DepositsListComponent
            },
            {
                path: ':depositId',
                component: DepositDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(DEPOSITS_ROUTES), CommonModule, HeaderModule],
    declarations: [DepositsListComponent, DepositDetailsComponent]
})
export class DepositsModule {
}
