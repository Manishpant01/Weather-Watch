import { fetchAPI } from "../apiHandler";
declare const global: any;

global.fetch = jest.fn();

describe("fetchAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should perform a GET request successfully", async () => {
    const mockData = { success: true };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchAPI<{ success: boolean }>(
      "https://api.example.com/data"
    );

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockData);
  });

  it("should perform a POST request successfully", async () => {
    const mockData = { success: true };
    const postData = { name: "John Doe" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchAPI<{ success: boolean }>(
      "https://api.example.com/data",
      {
        method: "POST",
        body: postData,
      }
    );

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    expect(result).toEqual(mockData);
  });

  it("should throw an error when the response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: "Not Found" }),
    });

    await expect(
      fetchAPI<{ success: boolean }>("https://api.example.com/data")
    ).rejects.toThrow("HTTP error! status: 404");
  });

  it("should throw an error when fetch fails", async () => {
    const mockError = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(
      fetchAPI<{ success: boolean }>("https://api.example.com/data")
    ).rejects.toThrow("Network error");
  });
});
