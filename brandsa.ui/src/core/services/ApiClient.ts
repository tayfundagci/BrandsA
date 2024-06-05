import mdlBaseResponse from "../servicemodels/BaseResponse";

module ApiClient {


  export async function GetAsync<R>(path: string, req?: RequestInit): Promise<R | undefined> {
    try {
      const response = await fetch(`https://localhost:5000/api/${path}`, req);
      const data = await response.json();
      return data as R;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`GetAsync error: ${error.message}`);
      } else {
        throw new Error(`GetAsync error: An unknown error occurred.`);
      }
    }
  }

  export async function PostAsync<R>(path: string, req?: RequestInit): Promise<R> {
    try {
      const response = await fetch(`https://localhost:5000/api/${path}`, req);
      const data = await response.json();
      return data as R;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`GetAsync error: ${error.message}`);
      } else {
        throw new Error(`GetAsync error: An unknown error occurred.`);
      }
    }
  }

  export async function DeleteAsync<R>(path: string, req?: RequestInit): Promise<R> {
    try {
      const response = await fetch(`https://localhost:5000/api/${path}`, req);
      const data = await response.json();
      return data as R;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`GetAsync error: ${error.message}`);
      } else {
        throw new Error(`GetAsync error: An unknown error occurred.`);
      }
    }
  }

  export async function PutAsync<R>(path: string, req?: RequestInit): Promise<R> {
    try {
      const response = await fetch(`https://localhost:5000/api/${path}`, { ...req, method: "PUT" });
      const data = await response.json();
      return data as R;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`GetAsync error: ${error.message}`);
      } else {
        throw new Error(`GetAsync error: An unknown error occurred.`);
      }
    }
  }
}

export default ApiClient;