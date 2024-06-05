
import CookieManager from "../helpers/CookieManager";
import mdlCreateProductRequest from "../servicemodels/product/CreateProductRequest";
import mdlCreateProductResponse from "../servicemodels/product/CreateProductResponse";
import mdlDeleteProductResponse from "../servicemodels/product/DeleteProductResponse";
import mdlGetProductResponse from "../servicemodels/product/GetProductResponse";
import mdlListProductRequest from "../servicemodels/product/ListProductRequest";
import mdlListProductResponse from "../servicemodels/product/ListProductResponse";
import mdlUpdateProductRequest from "../servicemodels/product/UpdateProductRequest";
import mdlUpdateProductResponse from "../servicemodels/product/UpdateProductResponse";
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

  export const Delete = async (id: string): Promise<mdlDeleteProductResponse> => {
    const response = await ApiClient.DeleteAsync(servicePath() + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const cResponse = response as mdlDeleteProductResponse;
    return cResponse;
  };

  export const Update = async (
    req: mdlUpdateProductRequest
  ): Promise<mdlUpdateProductResponse> => {
    const response = await ApiClient.PutAsync(servicePath() + `/${req.id}`, {
      method: "GET",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    var cResponse = response as mdlUpdateProductResponse;
    return cResponse;
  };

  export const Get = async (id: string): Promise<mdlGetProductResponse> => {
    const response = await ApiClient.GetAsync(servicePath() + `/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const cResponse = response as mdlGetProductResponse;
    return cResponse;
  };




}

export default ProductService;