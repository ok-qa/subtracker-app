import { createContext, useContext, useEffect, useState } from "react";
import {
  getSubscriptions,
  editSubscription,
  addSubscription,
  deleteSubscription,
  getCategories,
  getTerms,
} from "../api/index";
import { useSelector } from "react-redux";

const SubscriptionContext = createContext();
const perPage = 10;

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);
  const [termFilter, setTermFilter] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sliderValue, setSliderValue] = useState([0, 1500]);
  const [debouncedSliderValue, setDebouncedSliderValue] = useState("");
  const { token } = useSelector((state) => state.app);

  const fetchSubscriptions = async () => {
    try {
      const {
        data: { data, totalPages },
      } = await getSubscriptions({
        page,
        perPage,
        sortOption,
        categoryFilters,
        termFilter,
        search: debouncedSearchValue,
        minPrice: debouncedSliderValue[0],
        maxPrice: debouncedSliderValue[1],
      });
      setSubscriptions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch subscriptions: ", error);
    }
  };

  const fetchCategoriesAndTerms = async () => {
    try {
      const [categories, terms] = await Promise.all([
        getCategories(),
        getTerms(),
      ]);

      setCategories(categories);
      setTerms(terms);
    } catch (err) {
      console.error("Failed to load categories/terms", err);
    }
  };

  const handleSearch = (value) => {
    setDebouncedSearchValue(value);
  };

  const handleSlider = (priceRangeValues) => {
    setDebouncedSliderValue(priceRangeValues);
  };

  const clearAllFilters = () => {
    setCategoryFilters([]);
    setTermFilter();
    setSliderValue([0, 1500]);
    setDebouncedSliderValue([0, 1500]);
    setSearchValue("");
    setDebouncedSearchValue("");
  };

  useEffect(() => {
    if (token) {
      fetchSubscriptions();
    }
  }, [
    page,
    sortOption,
    token,
    categoryFilters,
    termFilter,
    debouncedSearchValue,
    debouncedSliderValue,
  ]);

  useEffect(() => {
    if (token) {
      fetchCategoriesAndTerms();
    }
  }, [token]);

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
          subscription._id === saved._id ? saved : subscription,
        ),
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

  const totalCostMonthly = subscriptions.reduce((sum, sub) => {
    const price = Number(sub.price) || 0;
    const monthly = sub.term.name === "year" ? price / 12 : price;
    return sum + monthly;
  }, 0);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription: handleAddSubscription,
        editSubscription: handleEditSubscription,
        deleteSubscription: handleDeleteSubscription,
        setSortOption,
        sortOption,
        categoryFilters,
        setCategoryFilters,
        termFilter,
        setTermFilter,
        totalCostMonthly,
        page,
        setPage,
        totalPages,
        categories,
        terms,
        handleSearch,
        handleSlider,
        sliderValue,
        setSliderValue,
        debouncedSliderValue,
        setDebouncedSliderValue,
        searchValue,
        setSearchValue,
        debouncedSearchValue,
        setDebouncedSearchValue,
        clearAllFilters,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);
