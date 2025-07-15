import { createContext, useContext, useEffect, useState } from "react";

const SubscriptionContext = createContext();
export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  });
  const [sortOption, setSortOption] = useState("name-asc");
  const [categoryFilters, setCategoryFilters] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  // CRUD operations
  const addSubscription = (s) => setSubscriptions((prev) => [...prev, s]);

  const editSubscription = (updated) =>
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );

  const deleteSubscription = (id) =>
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));

  // Derived data (no memo)
  const filteredSubs = subscriptions.filter((sub) =>
    categoryFilters.length ? categoryFilters.includes(sub.category) : true
  );

  const sortedSubscriptions = filteredSubs
    .slice() // copy to avoid mutating state
    .sort((a, b) => {
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

  const totalCostMonthly = subscriptions.reduce((sum, sub) => {
    const price = Number(sub.price) || 0;
    const monthly =
      sub.term === "year" || sub.term === "yearly" ? price / 12 : price;
    return sum + monthly;
  }, 0);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions: sortedSubscriptions,
        addSubscription,
        editSubscription,
        deleteSubscription,
        setSortOption,
        sortOption,
        categoryFilters,
        setCategoryFilters,
        totalCostMonthly,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
