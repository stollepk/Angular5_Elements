import {AccountVerificationStatus} from "../../../shared/enums/account-verification-status";
import {ClientSortBy} from "../../../shared/enums/client-sort-by";

export class ClientSearchModel {
  pageNumber: number;
  perPageCount: number;
  sortBy: ClientSortBy;
  filter: FilterModel;
}

class FilterModel {
  name: string;
  statuses: AccountVerificationStatus[];
}
