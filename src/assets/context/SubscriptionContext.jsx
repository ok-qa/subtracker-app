import { createContext, useContext, useState } from "react";

const SubscriptionContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (subscription) => {
    setSubscriptions((prev) => [...prev, subscription]);
  };

  const editSubscription = (updatedSubscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
  };

  // Delete
  const deleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        editSubscription,
        deleteSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
