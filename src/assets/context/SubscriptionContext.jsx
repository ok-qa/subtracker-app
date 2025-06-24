import { createContext, useContext, useEffect, useState } from "react";

const SubscriptionContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  });
  const [sortOption, setSortOption] = useState("");

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Add
  const addSubscription = (subscription) => {
    setSubscriptions((prev) => [...prev, subscription]);
  };

  // Edit
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

  // Sort
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "term":
        return a.term.localeCompare(b.term);
      case "end-date":
        return new Date(a.endDate) - new Date(b.endDate);
      default:
        return 0;
    }
  });

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions: sortedSubscriptions,
        addSubscription,
        editSubscription,
        deleteSubscription,
        setSortOption,
        sortOption,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
