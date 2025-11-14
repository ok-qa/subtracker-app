import { axiosInstance } from "./axios";

const authPrefix = "/auth";

export const authRequests = () => {
  return {
    registerRequest: (data) =>
      axiosInstance.request({
        method: "POST",
        url: `${authPrefix}/register`,
        data,
      }),

    loginRequest: (data) =>
      axiosInstance.request({
        method: "POST",
        url: `${authPrefix}/login`,
        data,
      }),

    logoutRequest: () =>
      axiosInstance.request({
        method: "POST",
        url: `${authPrefix}/logout`,
      }),

    forgotPasswordRequest: (data) =>
      axiosInstance.request({
        method: "POST",
        url: `${authPrefix}/request-reset-email`,
        data,
      }),

    resetPasswordRequest: (data) =>
      axiosInstance.request({
        method: "POST",
        url: `${authPrefix}/reset-password`,
        data,
      }),
  };
};
