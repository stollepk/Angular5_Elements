import {ElementsApiService} from "./elements-api.service";
import {CryptocurrencyWithdrawalRequestModel} from "../models/cryptocurrency-withdrawal-request.model";

export class CryptoOrderService {
  constructor(private api: ElementsApiService) {}

  placeWithdrawalOrder(order: CryptocurrencyWithdrawalRequestModel) {
    return this.api.post("cryptocurrency/withdraw", order);
  }
}
