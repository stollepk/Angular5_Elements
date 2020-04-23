import {ElementsApiService} from "./elements-api.service";
import {Observable} from "rxjs/Observable";

export class BankService {
  constructor(private api: ElementsApiService) {}

  searchBanks(query: string, countryId: number): Observable<any> {
    return this.api.get("bank/search", {params: {query: query, countryId: countryId}});
  }
}
