import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatbotAuthComponent } from "./chatbot-auth.component";
import { ChatbotLoginComponent } from "./chatbot-login/chatbot-login.component";
import { ChatbotLogin2faComponent } from "./chatbot-login-2fa/chatbot-login-2fa.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { ChatbotAuthSuccessComponent } from "./chatbot-auth-success/chatbot-auth-success.component";
import { ChatbotAuthErrorComponent } from "./chatbot-auth-error/chatbot-auth-error.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChatbotAuthComponent,
    ChatbotLoginComponent,
    ChatbotLogin2faComponent,
    ChatbotAuthSuccessComponent,
    ChatbotAuthErrorComponent
  ]
})
export class ChatbotAuthModule { }
