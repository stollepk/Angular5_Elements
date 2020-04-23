import { Pipe, PipeTransform } from "@angular/core";
import {AccountVerificationStatus} from "../../../shared/enums/account-verification-status";

@Pipe({
  name: "clientVerificationStatus"
})
export class ClientVerificationStatusPipe implements PipeTransform {

  transform(value: AccountVerificationStatus): string {
    switch (value) {
      case AccountVerificationStatus.Approved:
        return "Approved";
      case AccountVerificationStatus.NotVerified:
        return "Not Verified";
      case AccountVerificationStatus.Pending:
        return "Pending";
      case AccountVerificationStatus.RunningChecks:
        return "Running Checks";
      case AccountVerificationStatus.UnderReview:
        return "Under Review";
      default:
        return null;
    }
  }

}
