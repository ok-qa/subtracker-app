import { axiosInstance } from "./axios";

export const featureFlagsRequests = () => {
  return {
    getFeatureFlagsRequest: () =>
      axiosInstance.request({ method: "GET", url: "/feature-flags" }),

  };
};
