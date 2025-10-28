import { axiosInstance } from "./axios";

export const subscriptionsRequests = () => {
  return {
    getSubscriptionsRequest: async ({ page, perPage }) =>
      axiosInstance.request({
        method: "GET",
        url: `subscriptions?page=${page}&perPage=${perPage}`,
      }),
    createSubscriptionRequest: (subscription) =>
      axiosInstance.request({
        method: "POST",
        url: "subscriptions",
        data: subscription,
      }),
    updateSubscriptionRequest: (id, subscription) =>
      axiosInstance.request({
        method: "PUT",
        url: `subscriptions/${id}`,
        data: subscription,
      }),

    deleteSubscriptionRequest: (id) =>
      axiosInstance.request({
        method: "DELETE",
        url: `subscriptions/${id}`,
      }),
  };
};
