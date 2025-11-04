import { axiosInstance } from "./axios";

export const termsRequest = () => ({
  getTermsRequest: async () => {
    return axiosInstance.request({ method: "GET", url: "terms" });
  },
});
