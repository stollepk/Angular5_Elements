import {AccountVerificationStatus} from "../../../shared/enums/account-verification-status";

export class ClientSearchResult {
  data: ClientListModel[];
  count: number;
}

export class ClientListModel {
  id: number;
  accountVerificationStatus: AccountVerificationStatus;
  fullName: string;
  registerDate: Date;
}
