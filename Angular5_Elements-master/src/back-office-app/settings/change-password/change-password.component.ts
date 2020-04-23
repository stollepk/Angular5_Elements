import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/api.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";
import {confirmPasswordValidator, passwordPatternValidator} from "../../../common/validators";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private ngUnsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      "oldPassword": this.fb.control("", [Validators.required]),
      "password": this.fb.control("", [Validators.required, passwordPatternValidator]),
      "confirmPassword": this.fb.control("", [Validators.required])
    },
      {validator: confirmPasswordValidator});
  }

  change() {
    if (this.form.invalid) {
      return;
    }

    this.api.post("user-manager/change-password", this.form.value)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(this.onSuccess.bind(this), err => alert(err));
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  private onSuccess (result: boolean) {
    result ? alert("Password changed!") : alert("Password not changed");
    this.form.reset();
    this.cd.detectChanges();
  }

}
