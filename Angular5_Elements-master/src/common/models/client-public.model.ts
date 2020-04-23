export class ClientPublicModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
