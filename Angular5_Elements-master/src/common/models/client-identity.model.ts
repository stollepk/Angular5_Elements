import {PersonalParticularsModel} from "./personal-particulars.model";
import {ClientAddressModel} from "./client-address.model";

export class ClientIdentityModel {
  personalParticularsModel: PersonalParticularsModel;
  clientAddressModel: ClientAddressModel;
  passportNumber: string;
}
