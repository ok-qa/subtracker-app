import axios from "axios";
import { api } from "..";
import { store } from "../../store";
import { resetToken, setToken } from "../../store/slices/app";
import { removeToken, saveToken } from "../../localStorage";

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/`,
  timeout: 1000 * 20,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.data.message === "Access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            return axiosInstance(originalRequest);
          })
          .catch(Promise.reject);
      }
      isRefreshing = true;

      try {
        const {
          data: { data },
        } = await axiosInstance.post("/auth/refresh");
        const newAccessToken = data.accessToken;
        api.setAuthHeader(newAccessToken);
        saveToken(newAccessToken);
        store.dispatch(setToken(newAccessToken));
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        processQueue(refreshError, null);
        store.dispatch(resetToken());
        removeToken();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
