import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-personal-particulars",
  templateUrl: "./personal-particulars.component.html",
  styleUrls: ["./personal-particulars.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalParticularsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
