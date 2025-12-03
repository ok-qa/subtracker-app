import { axiosInstance } from "./axios";

export const userRequests = () => {
  return {
    getUserProfileRequest: () =>
      axiosInstance.request({ method: "GET", url: "/user" }),

    updateProfileRequest: (data) =>
      axiosInstance.request({
        method: "PATCH",
        url: "/user",
        data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
  };
};
