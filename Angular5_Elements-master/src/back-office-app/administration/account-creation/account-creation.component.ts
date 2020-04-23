import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "app-account-creation",
  templateUrl: "./account-creation.component.html",
  styleUrls: ["./account-creation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCreationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  roles: string[];

  private ngUnsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.get("role-management/get-roles")
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(value => { this.roles = value; this.cd.detectChanges(); }, err => alert(err));

    this.form = this.fb.group({
      "email": this.fb.control("", [Validators.compose([Validators.required, Validators.email])]),
      "role": this.fb.control("", [Validators.required])
    });
  }

  create() {
    if (this.form.invalid) {
      return;
    }

    this.api.post("user-manager/create-user", this.form.value)
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(this.onCreateSuccess.bind(this), err => alert(err));
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  private onCreateSuccess() {
    this.form.reset();
    alert("Success!");
    this.cd.detectChanges();
  }
}
