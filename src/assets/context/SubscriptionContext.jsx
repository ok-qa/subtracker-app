// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const SubscriptionContext = createContext();

// export const useSubscriptions = () => useContext(SubscriptionContext);

// export const SubscriptionProvider = ({ children }) => {
//   const [subscriptions, setSubscriptions] = useState(() => {
//     const stored = localStorage.getItem("subscriptions");
//     return stored ? JSON.parse(stored) : [];
//   });
//   const [sortOption, setSortOption] = useState("");
//   const [categoryFilters, setCategoryFilters] = useState([]);

//   // Save to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
//   }, [subscriptions]);

//   // Add
//   const addSubscription = (subscription) => {
//     setSubscriptions((prev) => [...prev, subscription]);
//   };

//   // Edit
//   const editSubscription = (updatedSubscription) => {
//     setSubscriptions((prev) =>
//       prev.map((sub) =>
//         sub.id === updatedSubscription.id ? updatedSubscription : sub
//       )
//     );
//   };

//   // Delete
//   const deleteSubscription = (id) => {
//     setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
//   };

//   // Sort
//   const sortedSubscriptions = [...subscriptions].sort((a, b) => {
//     switch (sortOption) {
//       case "name-asc":
//         return a.name.localeCompare(b.name);
//       case "name-desc":
//         return b.name.localeCompare(a.name);
//       case "price-asc":
//         return a.price - b.price;
//       case "price-desc":
//         return b.price - a.price;
//       case "term":
//         return a.term.localeCompare(b.term);
//       case "end-date":
//         return new Date(a.endDate) - new Date(b.endDate);
//       default:
//         return 0;
//     }
//   });

//   // Calculate  total cost per month
//   const totalCostMonthly = useMemo(() => {
//     return subscriptions.reduce((sum, sub) => {
//       const price = Number(sub.price) || 0;
//       let monthly = 0;
//       if (sub.term === 'month' || sub.term === 'monthly')   {monthly = price}
//       else if (sub.term === "year" || sub.term === 'yearly') {monthly = price / 12}
//       return sum + monthly;
//     }, 0);
//   }, [subscriptions]);

//   // Filter
//   const filteredSubs = useMemo(() => {
//   return subscriptions.filter((sub) => categoryFilters.length ? categoryFilters.includes(sub.category) : true)
// }, [subscriptions, categoryFilters, sortOption]);


//   return (
//     <SubscriptionContext.Provider
//       value={{
//         subscriptions: sortedSubscriptions,
//         filteredSubs,
//         addSubscription,
//         editSubscription,
//         deleteSubscription,
//         setSortOption,
//         sortOption,
//         totalCostMonthly,
//         categoryFilters,
//         setCategoryFilters,
//       }}
//     >
//       {children}
//     </SubscriptionContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";

const SubscriptionContext = createContext();
export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const stored = localStorage.getItem("subscriptions");
    return stored ? JSON.parse(stored) : [];
  });
  const [sortOption, setSortOption] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  // CRUD operations
  const addSubscription = (s) =>
    setSubscriptions((prev) => [...prev, s]);

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
      sub.term === "year" || sub.term === "yearly"
        ? price / 12
        : price;
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