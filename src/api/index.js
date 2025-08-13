import { STORAGE_KEY } from "../constants";

//get subscriptions
export const getInitialSubscriptions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
    return [];
  }
};

//save subscription whenever it changes
export const updateSubscriptions = (subscriptions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  } catch (error) {
    console.error("Failed to update subscriptions:", error);
  }
};

// CRUD operations
//POST
export const addSubscription = (subscription) => {
  const subscriptions = getInitialSubscriptions();
  subscriptions.push(subscription);
  updateSubscriptions(subscriptions);
};

//  UPDATE (PATCH)
export const editSubscription = (updated) => {
  const subscriptions = getInitialSubscriptions().map((subscription) =>
    subscription.id === updated.id ? updated : subscription
  );
  updateSubscriptions(subscriptions);
};

// DELETE
export const deleteSubscription = (id) => {
  const subscriptions = getInitialSubscriptions().filter((subscription) => 
    subscription.id !== id);
  updateSubscriptions(subscriptions);
};
