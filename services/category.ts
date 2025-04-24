const URL = "http://127.0.0.1:8090";

export const categoryApi = {
  getCategories: async (): Promise<any> => {
    const response = await fetch(`${URL}/api/collections/categories/records`, {
      next: { revalidate: 0 },
    });

    return response.json();
  },
  getCategory: async (categoryId: string): Promise<any> => {
    const response = await fetch(
      `${URL}/api/collections/categories/records/${categoryId}`
    );

    return response.json();
  },
  updateCategoryStatus: async (categoryId: string, body: any) => {
    const response = await fetch(
      `${URL}/api/collections/categories/records/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-cache",
      }
    );

    return response.json();
  },
};
