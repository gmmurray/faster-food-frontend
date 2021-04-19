import axios from 'axios';
let process: any;
interface ApiClientConstructorProps {
  timeout?: number;
}

interface ActionParams {
  url?: string;
}

interface PostParams extends ActionParams {
  body: Record<string, any>;
}

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(props: ApiClientConstructorProps = null) {
    this.baseUrl = process.env.SVELTE_APP_BACKEND_URL;
    this.timeout = props?.timeout ?? 5000;
  }

  async post(params: PostParams) {
    try {
      return await axios({
        baseURL: this.baseUrl,
        method: 'POST',
        url: params.url || '',
        data: {
          ...params.body,
        },
        timeout: this.timeout,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async get(params: ActionParams) {
    try {
      return await axios({
        baseURL: this.baseUrl,
        method: 'GET',
        url: params.url || '',
        timeout: this.timeout,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}
