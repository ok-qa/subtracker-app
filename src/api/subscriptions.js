import { axiosInstance } from "./axios";

export const subscriptionsRequests = () => {
  return {
    getSubscriptionsRequest: async ({
      page,
      perPage,
      sortBy,
      sortOrder,
      categoryFilters,
      search,
      termFilter,
      minPriceFilter,
      maxPriceFilter,
    }) => {
      let url = `subscriptions?page=${page}&perPage=${perPage}`;
      if (sortBy && sortOrder) {
        url = url + `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      }
      if (categoryFilters.length) {
        url = url + `&categoryIds=${categoryFilters}`;
      }
      if (search) {
        url = url + `&name=${search}`;
      }
      if (termFilter) {
        url = url + `&term=${termFilter}`;
      }
      if (minPriceFilter) {
        url = url + `&minPrice=${minPriceFilter}`;
      }
      if (maxPriceFilter) {
        url = url + `&maxPrice=${maxPriceFilter}`;
      }
      return axiosInstance.request({
        method: "GET",
        url,
      });
    },
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
