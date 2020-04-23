import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-settings-layout",
  templateUrl: "./settings-layout.component.html",
  styleUrls: ["./settings-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
