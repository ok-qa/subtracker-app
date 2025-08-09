import { createContext, useContext, useState } from "react";
import {
  getInitialSubscriptions,
  editSubscription,
  addSubscription,
  deleteSubscription,
} from "../api/index";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(getInitialSubscriptions());
  const [sortOption, setSortOption] = useState("name-desc");

  const [categoryFilters, setCategoryFilters] = useState([]);

  // CRUD operations
  // add
  const handleAddSubscription = (subscription) => {
    addSubscription(subscription);
    setSubscriptions(getInitialSubscriptions());
  };
  // edit
  const handleEditSubscription = (updatedSubscription) => {
    editSubscription(updatedSubscription);
    setSubscriptions(getInitialSubscriptions()); // refresh state
  };

  //delete
  const handleDeleteSubscription = (id) => {
    deleteSubscription(id);
    setSubscriptions(getInitialSubscriptions()); // refresh state
  };

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
        addSubscription: handleAddSubscription,
        editSubscription: handleEditSubscription,
        deleteSubscription: handleDeleteSubscription,
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

export const useSubscriptions = () => useContext(SubscriptionContext);
