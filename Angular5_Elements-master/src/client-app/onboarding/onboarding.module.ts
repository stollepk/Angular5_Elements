import { NgModule } from "@angular/core";
import { OnboardingComponent } from "./onboarding.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatGridListModule, MatInputModule, MatSelectModule, MatStepperModule
} from "@angular/material";
import { EmailVerificationComponent } from "./email-verify/email-verify.component";
import { Enable2faComponent } from "./enable-2fa/enable-2fa.component";
import { IdentityComponent } from "./identity/identity.component";
import { AddBankComponent } from "./add-bank/add-bank.component";
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../../common/auth-guard.service";
import { WebcamModule } from "ngx-webcam";
import { HeaderModule } from "../shared/components/header/header.module";
import { FooterModule } from "../shared/components/footer/footer.module";
import {IdentityModule} from "./identity/identity.module";
import {AddBankModule} from "./add-bank/add-bank.module";

@NgModule({
    imports: [
        SharedModule,
        MatButtonModule,
        MatStepperModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatGridListModule,
        MatCardModule,
        WebcamModule,
        HeaderModule,
        FooterModule,
        IdentityModule,
        AddBankModule,
        RouterModule.forChild([{ path: "onboarding", component: OnboardingComponent, canActivate: [AuthGuard] }])
    ],
    declarations: [OnboardingComponent, EmailVerificationComponent, Enable2faComponent, UploadDocumentsComponent],
    exports: [RouterModule]
})
export class OnboardingModule { }
