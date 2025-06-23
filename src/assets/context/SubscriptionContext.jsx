import { createContext, useContext, useState, useEffect, useMemo } from "react";

const SubscriptionContext = createContext();
export const useSubscriptions = () => useContext(SubscriptionContext);

const getInitialSubscriptions = () => {
  try {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
    return [];
  }
};

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(getInitialSubscriptions);
  const [sortOption, setSortOption] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (subscription) => {
    setSubscriptions((prev) => [...prev, subscription]);
  };

  const editSubscription = (updated) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === updated.id ? updated : sub))
    );
  };

  const deleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const filterAndSort = useMemo(() => {
    let data = subscriptions;
    if (categoryFilters.length) {
      data = data.filter((s) => categoryFilters.includes(s.category));
    }

    return [...data].sort((a, b) => {
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
  }, [subscriptions, categoryFilters, sortOption]);

  // const filtered = categoryFilter
  //   ? subscriptions.filter((sub) => sub.category === categoryFilter)
  //   : subscriptions;

  // const filteredSubscriptions = useMemo(() => {
  //   return subscriptions.filter((sub) =>
  //     categoryFilters.length ? categoryFilters.includes(sub.category) : true
  //   );
  // }, [subscriptions, categoryFilters, sortOption]);

  const totalCostMonthly = useMemo(() => {
    return subscriptions.reduce((sum, sub) => {
      const price = Number(sub.price) || 0;
      let monthly = 0;
      if (sub.term === "monthly") monthly = price;
      else if (sub.term === "yearly") monthly = price / 12;
      return sum + monthly;
    }, 0);
  }, [subscriptions]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions: filterAndSort,
        addSubscription,
        editSubscription,
        deleteSubscription,
        sortOption,
        setSortOption,
        categoryFilters,
        setCategoryFilters,
        totalCostMonthly,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
