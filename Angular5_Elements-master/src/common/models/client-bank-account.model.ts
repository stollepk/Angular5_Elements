export class ClientBankAccountModel {
  id: number;
  clientId: number;
  name: string;
  accountHolder: string;
  accountNumber: string;
  swiftCode: string;
  bankId: number;
  bankName: string;
  clearingCode: string;
  countryId: number;
  isDefault: boolean;
}
