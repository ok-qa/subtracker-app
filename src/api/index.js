import { axiosInstance } from "./axios";
import { categoriesRequest } from "./categories";
import { termsRequest } from "./terms";
import { subscriptionsRequests } from "./subscriptions";
import { authRequests } from "./auth";

export const api = {
  ...authRequests(),
  ...subscriptionsRequests(),
  ...termsRequest(),
  ...categoriesRequest(),
  getBaseURL: () => axiosInstance.defaults.baseURL,
};

//auth
export const signUp = async (registerData) => {
  const {
    data: { data },
  } = await api.registerRequest(registerData);
  return data;
};

export const signIn = async (loginData) => {
  const {
    data: { data },
  } = await api.loginRequest(loginData);
  return data;
};

export const logout = async () => {
  try {
    await api.logoutRequest();
  } catch (error) {
    console.error("Failed to logout: ", error);
  }
};

export const forgotPassword = (email) => api.forgotPasswordRequest({ email });

export const changePassword = (data) => api.resetPasswordRequest(data);

//get subscriptions
export const getSubscriptions = async (params = {}) => {
  try {
    const parsedParams = {
      page: params.page ? params.page : 1,
      perPage: params.perPage ? params.perPage : 10,
    };
    const { data } = await api.getSubscriptionsRequest(parsedParams);
    return data;
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
    return { data: [], total: 0, page: 1, perPage: 10, totalPages: 1 };
  }
};

export const addSubscription = async (payload) => {
  try {
    const {
      data: { data },
    } = await api.createSubscriptionRequest(payload);
    return data;
  } catch (error) {
    console.error("Failed to add subscription:", error);
    throw error;
  }
};

export const editSubscription = async (updatedId, payload) => {
  try {
    const {
      data: { data },
    } = await api.updateSubscriptionRequest(updatedId, payload);
    return data;
  } catch (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }
};

export const deleteSubscription = async (id) => {
  try {
    await api.deleteSubscriptionRequest(id);
    return id;
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    throw error;
  }
};

//get categories
export const getCategories = async () => {
  try {
    const {
      data: { data },
    } = await api.getCategoriesRequest();
    return data;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
};

//get terms
export const getTerms = async () => {
  try {
    const {
      data: { data },
    } = await api.getTermsRequest();
    return data;
  } catch (error) {
    console.error("Failed to load terms:", error);
    return [];
  }
};
