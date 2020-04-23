import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService, TOKEN_STORAGE_KEY} from "../../../shared/api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: "app-chatbot-login-2fa",
  templateUrl: "./chatbot-login-2fa.component.html",
  styleUrls: ["./chatbot-login-2fa.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotLogin2faComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private ngUnsub = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService) { }

  ngOnInit() {
    this.form = this.fb.group({
      "code": this.fb.control("", [Validators.required])
    });
  }

  verify() {
    if (this.form.invalid) {
      return;
    }

    this.api
      .post("auth/login-2fa-chatbot", this.form.value)
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(() => this.onSuccess(true), () => this.onSuccess(false));
  }

  private onSuccess (isSuccess: boolean) {
    const path = isSuccess ? "success" : "error";
    const url = `${this.router.url}/${path}`;
    if (isSuccess) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
