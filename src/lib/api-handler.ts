interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
}

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = "/api") {
    this.baseURL = baseURL;
  }

  async fetch<T = unknown>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json() as Promise<T>;
  }
}
