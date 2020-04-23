import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ElementsApiService } from "../../../../common/services/elements-api.service";
import { AuthDataStorage } from "../../../../common/auth-data.storage";
import { CreateOrderDialogComponent } from "../../../dialog/create-order-dialog/create-order-dialog.component";
import { OrderType } from "../../../../common/enums/order-type";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private api: ElementsApiService,
        private authDataStorage: AuthDataStorage,
        private router: Router) { }

    ngOnInit() {
    }

    openSellDialog() {
        const dialogRef = this.dialog.open(
            CreateOrderDialogComponent,
            { data: { orderType: OrderType.Ask } });
    }

    openBuyDialog() {
        const dialogRef = this.dialog.open(
            CreateOrderDialogComponent,
            { data: { orderType: OrderType.Bid } });
    }

    getRich() {
        this.authDataStorage
            .getClientId()
            .pipe(
                switchMap(id => this.api.put(`client/get-rich/${id}`, null))
            )
            .subscribe(x => console.log("ok"));
    }

    logout() {
        this.authDataStorage.unsetToken();
        this.router.navigate(["/auth/login"]);
    }
}
