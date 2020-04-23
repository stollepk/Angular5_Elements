import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientDetailsComponent } from "./client-details.component";
import { AttachmentComponent } from "./attachment/attachment.component";
import {HeaderModule} from "../../../shared/components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule
  ],
  declarations: [ClientDetailsComponent, AttachmentComponent]
})
export class ClientDetailsModule { }
