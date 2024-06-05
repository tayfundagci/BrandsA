import mdlUser from "../models/User";

export default class mdlLoginResponse {
  access_Token?: string;
  expiration?: string;
  refresh_Token?: string;
  user?: mdlUser;
}