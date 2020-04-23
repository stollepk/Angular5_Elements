import { NgModule } from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {IdentityComponent} from "./identity.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [IdentityComponent],
  exports: [IdentityComponent]
})
export class IdentityModule { }
