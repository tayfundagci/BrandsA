import mdlBaseResponse from "./BaseResponse";

export default class mdlBaseDataResponse<T> extends mdlBaseResponse {
  body?: T;
}