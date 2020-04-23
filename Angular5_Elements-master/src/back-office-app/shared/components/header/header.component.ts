import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {AuthDataStorage} from "../../../../common/auth-data.storage";
import {Router} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private authDataStorage: AuthDataStorage,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authDataStorage.unsetToken();
    this.router.navigate(["/auth/login"]);
  }

}
