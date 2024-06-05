export default class mdlCreateUserRequest {
  username: string;
  password: string;

  constructor(pUsername: string, pPassword: string) {
    this.username = pUsername;
    this.password = pPassword;
  }
}