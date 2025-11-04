import { createContext, useContext, useEffect, useState } from "react";
import {
  getSubscriptions,
  editSubscription,
  addSubscription,
  deleteSubscription,
} from "../api/index";
import { useSelector } from "react-redux";

const SubscriptionContext = createContext();
const perPage = 10;

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortOption, setSortOption] = useState("name-desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const { token } = useSelector((state) => state.app);

  const fetchSubscriptions = async () => {
    try {
      const {
        data: { data, totalPages },
      } = await getSubscriptions({ page, perPage });
      setSubscriptions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch subscriptions: ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubscriptions();
    }
  }, [page, token]);

  // CRUD operations
  // add
  const handleAddSubscription = async (data) => {
    try {
      const newSub = await addSubscription({
        ...data,
      });

      setSubscriptions((prev) => [...prev, newSub]);
    } catch (error) {
      console.error("Failed to add subscription:", error);
    }
  };

  // edit
  const handleEditSubscription = async (updatedSubscription) => {
    try {
      const saved = await editSubscription(updatedSubscription._id, {
        category: updatedSubscription.category,
        term: updatedSubscription.term,
        price: updatedSubscription.price,
        endDate: updatedSubscription.endDate,
      });

      setSubscriptions((prev) =>
        prev.map((subscription) =>
          subscription._id === saved._id ? saved : subscription
        )
      );
    } catch (error) {
      console.error("Failed to edit subscription:", error);
    }
  };

  //delete
  const handleDeleteSubscription = async (id) => {
    await deleteSubscription(id);
    await fetchSubscriptions();
  };

  const filteredSubs = subscriptions.filter((sub) =>
    categoryFilters.length ? categoryFilters.includes(sub.category) : true
  );

  const sortedSubscriptions = filteredSubs.slice().sort((a, b) => {
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
    const monthly = sub.term.name === "year" ? price / 12 : price;
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
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);
