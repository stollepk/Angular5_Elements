import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ApiService, TOKEN_STORAGE_KEY} from "../../../shared/api.service";
import {takeUntil} from "rxjs/operators";
import {TokenModel} from "../../../../shared/models/token-model";
import {ApplicationDomain} from "../../../../shared/enums/application-domain";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "app-chatbot-login",
  templateUrl: "./chatbot-login.component.html",
  styleUrls: ["./chatbot-login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotLoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  public errorMessage: string = null;
  private ngUnsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      "email": this.fb.control("", [Validators.compose([Validators.required, Validators.email])]),
      "password": this.fb.control("", [Validators.required]),
      "conversation": this.route.snapshot.params["conversation"]
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.api
      .post("auth/chatbot", this.form.value)
      .pipe(
        takeUntil(this.ngUnsub)
      )
      .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
  }

  private onError(model: any) {
    if (model.message === "403 OK") {
      this.errorMessage = "Login or password incorrect";
    } else {
      this.redirectTo("error");
    }
  }

  private onSuccess(token: TokenModel) {
    if (!token) {
      this.redirectTo("success");
      return;
    }
    if (token.domain !== ApplicationDomain.Client) {
      this.redirectTo("error");
      return;
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, token.token);
    this.redirectTo("2fa");
  }

  private redirectTo (path: string) {
    const url = `${this.router.url}/${path}`;
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

}
