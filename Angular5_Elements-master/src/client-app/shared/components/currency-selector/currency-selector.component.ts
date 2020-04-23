import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-currency-selector",
    templateUrl: "./currency-selector.component.html",
    styleUrls: ["./currency-selector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent implements OnInit {
    selected = "BTC";

    constructor() { }

    ngOnInit() {
    }

}
