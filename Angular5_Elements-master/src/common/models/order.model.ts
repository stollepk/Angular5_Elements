export class OrderModel {
  id: number;
  orderClass: number;
  orderType: number;
  price: number;
  quantity: number;
  filledQuantity: number;
  createdAt: string;
  lastUpdated: string;
  symbol: string;
  userId: string;
  status: number;
}
