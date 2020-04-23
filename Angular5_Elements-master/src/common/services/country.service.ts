import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators";
import { Country } from "../models/country";
import {ElementsApiService} from "./elements-api.service";

@Injectable()
export class CountryService {
    private countries = new BehaviorSubject<Country[]>(null);

    constructor(private api: ElementsApiService) {
        api.get("common/get-countries")
            .subscribe(countries => this.countries.next(countries));
    }

    getCountries(): Observable<Country[]> {
        return this.countries.pipe(filter(value => value !== null));
    }
}
