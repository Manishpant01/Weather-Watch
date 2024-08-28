type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
};

// info: common fetch Api Handler
export const fetchAPI = async <T,>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.method !== "GET" ? JSON.stringify(options.body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
};
