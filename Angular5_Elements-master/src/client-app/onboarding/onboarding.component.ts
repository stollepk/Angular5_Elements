import {Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef} from "@angular/core";
import { MatStepper, MatHorizontalStepper, MatStep } from "@angular/material";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";
import { ClientValidationService } from "../shared/services/client-validation.service";

@Component({
    selector: "app-onboarding",
    templateUrl: "./onboarding.component.html",
    styleUrls: ["./onboarding.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent implements OnInit, OnDestroy {
    @ViewChild("stepper") stepper: MatStepper;
    private ngUnsub = new Subject();
    hasUploadedDocument: boolean;
    hasPhotoId: boolean;
    currentStep = 0;

    constructor(
        private validService: ClientValidationService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.validService.getStep()
            .pipe(takeUntil(this.ngUnsub))
            .subscribe(step => {
                this.stepper.selectedIndex = step;
                this.currentStep = step;
            }, err => alert(err));
    }

    toNextStep(event: any) {
        console.log(event);
        if (event.isVerified) {
            this.stepper.selected.completed = true;
            this.stepper.next();
            this.currentStep++;
            this.cd.markForCheck();
        } else {
            alert(event.message);
        }
    }

    ngOnDestroy(): void {
        this.ngUnsub.next();
        this.ngUnsub.complete();
    }
}
