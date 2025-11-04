import { axiosInstance } from "./axios";

export const categoriesRequest = () => ({
  getCategoriesRequest: async () => {
    return axiosInstance.request({ method: "GET", url: "categories" });
  },
});
