const getInitialSubscriptions = () => {
  try {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
    return [];
  }
};

export default getInitialSubscriptions;
