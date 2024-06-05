export default class mdlUserLoginRequest {
  username: string;
  password: string;

  constructor(pUsername: string, pPassword: string) {
    this.username = pUsername;
    this.password = pPassword;
  }
}