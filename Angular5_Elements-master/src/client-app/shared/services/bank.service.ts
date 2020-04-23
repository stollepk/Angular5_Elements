import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators";
import { Bank } from "../models/bank";
import { ApiService } from "../api.service";

@Injectable()
export class BankService {
    private banks = new BehaviorSubject<Bank[]>(null);

    constructor(private api: ApiService) {
        api.get("bank/get-banks-list")
            .subscribe(banks => this.banks.next(banks));
    }

    getBanks(): Observable<Bank[]> {
        return this.banks.pipe(filter(value => value !== null));
    }
}