import { NgModule } from "@angular/core";
import {ChatbotAuthModule} from "./chatbot-auth/chatbot-auth.module";
import {RouterModule, Routes} from "@angular/router";
import {ChatbotAuthComponent} from "./chatbot-auth/chatbot-auth.component";
import {ChatbotLoginComponent} from "./chatbot-auth/chatbot-login/chatbot-login.component";
import {ChatbotLogin2faComponent} from "./chatbot-auth/chatbot-login-2fa/chatbot-login-2fa.component";
import {ChatbotAuthErrorComponent} from "./chatbot-auth/chatbot-auth-error/chatbot-auth-error.component";
import {ChatbotAuthSuccessComponent} from "./chatbot-auth/chatbot-auth-success/chatbot-auth-success.component";

const appRoutes: Routes = [
  {
    path: "chatbot",
    children: [
      {
        path: "auth/:conversation",
        component: ChatbotAuthComponent,
        children: [
          {
            path: "",
            component: ChatbotLoginComponent
          },
          {
            path: "2fa",
            children: [
              {
                path: "",
                component: ChatbotLogin2faComponent
              },
              {
                path: "error",
                component: ChatbotAuthErrorComponent
              },
              {
                path: "success",
                component: ChatbotAuthSuccessComponent
              }
            ]
          },
          {
            path: "error",
            component: ChatbotAuthErrorComponent
          },
          {
            path: "success",
            component: ChatbotAuthSuccessComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    ChatbotAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ChatbotModule { }
