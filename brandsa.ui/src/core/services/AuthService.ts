
import CookieManager from "../helpers/CookieManager";
import mdlCreateUserRequest from "../servicemodels/user/CreateUserRequest";
import mdlCreateUserResponse from "../servicemodels/user/CreateUserResponse";
import mdlRefreshTokenRequest from "../servicemodels/user/RefreshTokenRequest";
import mdlRefreshTokenResponse from "../servicemodels/user/RefreshTokenResponse";
import mdlUserLoginRequest from "../servicemodels/user/UserLoginRequest";
import mdlUserLoginResponse from "../servicemodels/user/UserLoginResponse";
import ApiClient from "./ApiClient";

module UserService {
  const token = CookieManager.getCookie("token") as string;

  function servicePath(): string {
    return "auth/";
  }

  export const Create = async (
    req: mdlCreateUserRequest
  ): Promise<mdlCreateUserResponse> => {
    const response = await ApiClient.PostAsync(servicePath() + "signup", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    var cResponse = response as mdlCreateUserResponse;
    return cResponse;
  };


  export const Login = async (
    req: mdlUserLoginRequest
  ): Promise<mdlUserLoginResponse> => {
    const response = await ApiClient.PostAsync(servicePath() + "loginbyusername", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    var cResponse = response as mdlUserLoginResponse;
    return cResponse;
  };

  export const RefreshToken = async (
    req: mdlRefreshTokenRequest
  ): Promise<mdlRefreshTokenResponse> => {
    const response = await ApiClient.GetAsync(servicePath() + "refreshtoken", {
      method: "GET",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    var cResponse = response as mdlRefreshTokenResponse;
    return cResponse;
  }


}

export default UserService;