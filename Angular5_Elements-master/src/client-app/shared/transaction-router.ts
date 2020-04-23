import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { OrderModel } from "../../common/models/order.model";
import { TradePublicData } from "../../common/models/trade-public-data.model";
import { environment } from "../../environments/environment";
import { AuthDataStorage } from "../../common/auth-data.storage";
import { HubConnection } from "@aspnet/signalr";
import { ClientBalanceChangeModel } from "./models/client-balance-change.model";

@Injectable()
export class TransactionRouter {
  balanceChanges$ = new Subject<ClientBalanceChangeModel>();
  newTrades$ = new Subject<TradePublicData[]>();
  orderChanges$ = new Subject<OrderModel>();

  constructor(private authDataStorage: AuthDataStorage) {
    const token = authDataStorage.getToken();
    const url = `${environment.transactionRouterEndpoint}?tokenFromSignalR=${token}`;
    const connection = new HubConnection(url);

    connection.on("afterOrderActivation", activationResult => {
      this.orderChanges$.next(activationResult.order);
    });

    connection.on("onBalanceChange", change => {
      this.balanceChanges$.next(change);
    });

    connection.on("onOrderChanged", order => {
      this.orderChanges$.next(order);
    });

    connection.on("onNewTrades", trades => {
      this.newTrades$.next(trades);
    });

    connection.onclose(() => {
      connection.start();
    });

    connection.start();
  }
}
