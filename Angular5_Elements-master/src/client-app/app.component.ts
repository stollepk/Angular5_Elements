import { Component } from "@angular/core";
import { AuthDataStorage } from "../common/auth-data.storage";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  token: string;

  constructor(private authDataStorage: AuthDataStorage) {
    this.token = authDataStorage.getToken();
  }
}
