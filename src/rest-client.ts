import axios from 'axios';
import type { AxiosInstance } from 'axios';

export class RestClient {
  baseUrl: string = 'http://127.0.0.1:8000/api/v1/';
  clientInstance: AxiosInstance;

  private static instance: RestClient | null = null;

  private constructor() {
    this.clientInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }

    return RestClient.instance;
  }
}
