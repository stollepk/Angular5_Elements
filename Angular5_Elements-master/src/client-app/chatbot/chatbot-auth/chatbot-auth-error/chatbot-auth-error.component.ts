import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-chatbot-auth-error",
  templateUrl: "./chatbot-auth-error.component.html",
  styleUrls: ["./chatbot-auth-error.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotAuthErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
