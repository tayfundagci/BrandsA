import { enmRole } from "../../enums/Role";

export default class mdlCreateUserRequest {
  username: string;
  password: string;
  role: enmRole;

  constructor(pUsername: string, pPassword: string, pRole: enmRole) {
    this.username = pUsername;
    this.password = pPassword;
    this.role = pRole;
  }
}