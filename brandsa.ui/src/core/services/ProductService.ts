
import CookieManager from "../helpers/CookieManager";
import mdlCreateProductRequest from "../servicemodels/product/CreateProductRequest";
import mdlCreateProductResponse from "../servicemodels/product/CreateProductResponse";
import mdlListProductRequest from "../servicemodels/product/ListProductRequest";
import mdlListProductResponse from "../servicemodels/product/ListProductResponse";
import mdlCreateUserRequest from "../servicemodels/user/CreateUserRequest";
import mdlCreateUserResponse from "../servicemodels/user/CreateUserResponse";
import mdlRefreshTokenRequest from "../servicemodels/user/RefreshTokenRequest";
import mdlRefreshTokenResponse from "../servicemodels/user/RefreshTokenResponse";
import mdlUserLoginRequest from "../servicemodels/user/UserLoginRequest";
import mdlUserLoginResponse from "../servicemodels/user/UserLoginResponse";
import ApiClient from "./ApiClient";

module ProductService {
  const token = CookieManager.getCookie("access_Token") as string;

  function servicePath(): string {
    return "products";
  }

  export const Create = async (
    req: mdlCreateProductRequest
  ): Promise<mdlCreateProductResponse> => {
    const response = await ApiClient.PostAsync(servicePath(), {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    var cResponse = response as mdlCreateProductResponse;
    return cResponse;
  };

  export const List = async (
    req: mdlListProductRequest
  ): Promise<mdlListProductResponse> => {
    const response = await ApiClient.GetAsync(servicePath(), {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    var cResponse = response as mdlListProductResponse;
    return cResponse;
  };



}

export default ProductService;