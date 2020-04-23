import { ClientOrderStatus } from "../../../common/enums/client-order-status";

export interface ClientBankOrder {
    id: string,
    amount: number,
    asset: string,
    status: ClientOrderStatus,
    createdDate: string,
    reconciliationDate: string,
    type: number,
    bankStatementEntryId: string,
    signedByUserId: string,
    clientId: number,
    clientBankAccountId: number,
    orderReference: number,
    clientReference: number
}