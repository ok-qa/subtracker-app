//get subscriptions
export const getInitialSubscriptions = () => {
  try {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
    return [];
  }
};

//save subscription whenever it changes
export const updateSubscription = (subscriptions) => {
  try {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  } catch (error) {
    console.error("Failed to update subscriptions:", error);
  }
};

// // CRUD operations
// const [subscriptions, setSubscriptions] = useState(() => {
//   const stored = localStorage.getItem("subscriptions");
//   return stored ? JSON.parse(stored) : [];
// });
// export const addSubscription = (s) => setSubscriptions((prev) => [...prev, s]);

// export const editSubscription = (updated) =>
//   setSubscriptions((prev) =>
//     prev.map((s) => (s.id === updated.id ? updated : s))
//   );

// export const deleteSubscription = (id) =>
//   setSubscriptions((prev) => prev.filter((s) => s.id !== id));
