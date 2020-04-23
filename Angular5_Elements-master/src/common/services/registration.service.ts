import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ElementsApiService } from "./elements-api.service";

@Injectable()
export class RegisterService {
    constructor(private api: ElementsApiService) { }

    verifyClientEmail(code) {
        return this.api.post("register/verify-client-email", code);
    }

    clientPhone(number, opt) {
        return this.api.post("register/client-phone", number, opt);
    }

    verifyClientPhone(code) {
        return this.api.post("register/verify-client-phone", code);        
    }

}