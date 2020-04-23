import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ClientBalanceModel } from "../models/client-balance.model";
import { AuthDataStorage } from "../auth-data.storage";
import { ClientPublicModel } from "../models/client-public.model";
import { ElementsApiService } from "./elements-api.service";
import "rxjs/add/operator/publishReplay";
import {ClientIdentityModel} from "../models/client-identity.model";
import {ClientBankAccountModel} from "../models/client-bank-account.model";
import {BankOrderPublicModel} from "../models/bank-order.model";
import {CryptoOrderModel} from "../models/crypto-order.model";

@Injectable()
export class ClientService {
  constructor(private api: ElementsApiService, private authDataStorage: AuthDataStorage) {}

  getClientPublicData(id: number): Observable<ClientPublicModel> {
    return this.api.get(`client/${id}`);
  }

  getBalance(clientId: number): Observable<ClientBalanceModel[]> {
    return this.api.get(`balance/${clientId}`);
  }

  getClientIdentity(): Observable<ClientIdentityModel> {
    return this.api.get(`client/identity`);
  }

  getClientBankAccounts(): Observable<ClientBankAccountModel[]> {
    return this.api.get("client/bank-accounts");
  }

  getClientDeposits(): Observable<BankOrderPublicModel[]> {
    return this.api.get("fiat/order/deposits");
  }

  getClientWithdrawals(): Observable<BankOrderPublicModel[]> {
    return this.api.get("fiat/order/withdrawals");
  }

  getClientCryptoWithdrawals(asset: string): Observable<CryptoOrderModel[]> {
    return this.api.get("cryptocurrency/orders/withdrawals", {params: {asset: asset}});
  }

  getTransactionHistory() {
    return this.api.post("fiat/get-balance-detalization", {});
  }

  getPublicInfo(): Observable<ClientPublicModel> {
    return this.api.get("client/public-info");
  }

  deleteBankAccount(accId: number) {
    return this.api.delete(`client/bank-accounts/delete/${accId}`);
  }

  setDefaultBankAccount(accId: number) {
    return this.api.patch(`client/bank-accounts/set-default`, {value: accId});
  }
}
