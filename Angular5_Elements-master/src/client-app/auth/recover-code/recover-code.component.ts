import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import {ClientService} from "../../../common/services/client.service";

@Component({
    selector: "app-recover-code",
    templateUrl: "./recover-code.component.html",
    styleUrls: ["./recover-code.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverCodeComponent implements OnInit {
  email: string;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService
      .getPublicInfo()
      .subscribe(data => this.email = data.email, err => alert(err));
  }
}
