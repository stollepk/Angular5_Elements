import {AccountVerificationStatus} from "../../../shared/enums/account-verification-status";
import {PersonalParticularsModel} from "../../../common/models/personal-particulars.model";
import {ClientBankAccountModel} from "../../../common/models/client-bank-account.model";
import {AddressData} from "../../../common/models/client-address.model";
import {FileMetadataModel} from "./file-metadata-model";

export class ClientDetailsModel {
  id: number;
  registerDate: Date;
  accountVerificationStatus: AccountVerificationStatus;
  phone: string;
  email: string;
  photoId: FileMetadataModel;
  bill: FileMetadataModel;
  personalParticulars: PersonalParticularsModel;
  mainBankAccount: ClientBankAccountModel;
  residentialAddress: AddressData;
}
