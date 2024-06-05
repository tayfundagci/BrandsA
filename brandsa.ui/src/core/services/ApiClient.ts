
module ApiClient {

  export async function GetAsync<R>(path: string, req?: RequestInit): Promise<R | undefined> {
    try {
      const response = await fetch(`http://localhost:5000/api/${path}`, req);
      const data = await response.json();
      return data as R;
    } catch (error: any) {
      return error;
    }
  }

  export async function PostAsync<R>(path: string, req?: RequestInit): Promise<R> {
    try {
      const response = await fetch(`http://localhost:5000/api/${path}`, req);
      const data = await response.json();
      return data as R;
    } catch (error: any) {
      throw new Error(`PostAsync error: ${error.message}`);
    }
  }
}

export default ApiClient;