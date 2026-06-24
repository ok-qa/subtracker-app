import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [categories, setCategories] = useState({
    categoriesData: [],
    categoryFilters: [],
  });
  const [terms, setTerms] = useState({
    termsData: [],
    termFilter: undefined,
  });

  const [searchName, setSearchName] = useState({
    searchValue: "",
    debouncedSearchValue: "",
  });

  const [priceSlider, setPriceSlider] = useState({
    sliderValue: [0, 1500],
    debouncedSliderValue: "",
  });

  const [calculations, setCalculations] = useState({
    activeSubCount: 0,
    monthlyCost: 0,
    subRenewingColor: "",
    upcomingRenewalNumber: 0,
  });

  const { token } = useSelector((state) => state.app);

  const fetchSubscriptions = async () => {
    try {
      const {
        data: {
          data,
          totalPages,
          totalItems,
          activeSubscriptionsCount,
          totalMonthlyCost,
          renewalColor,
          upcomingRenewalCount,
        },
      } = await getSubscriptions({
        page: pagination.page,
        perPage,
        sortOption,
        categoryFilters: categories.categoryFilters,
        termFilter: terms.termFilter,
        search: searchName.debouncedSearchValue,
        minPrice: priceSlider.debouncedSliderValue[0],
        maxPrice: priceSlider.debouncedSliderValue[1],
      });
      setSubscriptions(data);
      setPagination({
        page: pagination.page,
        totalPages: totalPages,
        totalItems: totalItems,
      });
      setCalculations({
        activeSubCount: activeSubscriptionsCount,
        monthlyCost: totalMonthlyCost,
        subRenewingColor: renewalColor,
        upcomingRenewalNumber: upcomingRenewalCount,
      });
    } catch (error) {
      console.error("Failed to fetch subscriptions: ", error);
    }
  };

  const fetchCategoriesAndTerms = async () => {
    try {
      const [categoriesData, termsData] = await Promise.all([
        getCategories(),
        getTerms(),
      ]);
      setCategories({
        categoriesData,
        categoryFilters: categories.categoryFilters,
      });
      setTerms({ termsData, termFilter: terms.termFilter });
    } catch (err) {
      console.error("Failed to load categories/terms", err);
    }
  };

  const handleSearch = useCallback(
    (value) => {
      setSearchName({
        searchValue: searchName.searchValue,
        debouncedSearchValue: value,
      });
    },
    [searchName.searchValue],
  );

  const handleSlider = useCallback(
    (priceRangeValues) => {
      setPriceSlider({
        sliderValue: priceSlider.sliderValue,
        debouncedSliderValue: priceRangeValues,
      });
    },
    [priceSlider.sliderValue],
  );

  const clearAllFilters = () => {
    setCategories({
      categoriesData: categories.categoriesData,
      categoryFilters: [],
    });
    setTerms({
      termsData: terms.termsData,
      termFilter: undefined,
    });
    setPriceSlider({
      sliderValue: [0, 1500],
      debouncedSliderValue: [0, 1500],
    });
    setSearchName({
      searchValue: "",
      debouncedSearchValue: "",
    });
  };

  useEffect(() => {
    if (token) {
      fetchSubscriptions();
    }
  }, [
    pagination.page,
    sortOption,
    token,
    categories.categoryFilters,
    terms.termFilter,
    searchName.debouncedSearchValue,
    priceSlider.debouncedSliderValue,
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
      const newSub = await addSubscription(data);
      setSubscriptions((prev) => [...prev, newSub]);
    } catch (error) {
      console.error("Failed to add subscription:", error);
    }
  };

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

  const handleDeleteSubscription = async (id) => {
    try {
      await deleteSubscription(id);
      await fetchSubscriptions();
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription: handleAddSubscription,
        editSubscription: handleEditSubscription,
        deleteSubscription: handleDeleteSubscription,
        sortOption,
        setSortOption,
        calculations,
        pagination,
        setPagination,
        categories,
        setCategories,
        terms,
        setTerms,
        priceSlider,
        setPriceSlider,
        handleSlider,
        handleSearch,
        searchName,
        setSearchName,
        clearAllFilters,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);
