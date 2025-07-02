import { useSubscriptions } from "../../../../assets/context/SubscriptionContext";
import styles from "./SortSubscriptionSelect.module.css";

const SortSubscriptionSelect = () => {
  const { sortOption, setSortOption } = useSubscriptions();

  return (
    <div className={styles.selectWrapper}>
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
        }}
      >
        <option value="">-- Select --</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
        <option value="price-asc">Price Low → High</option>
        <option value="price-desc">Price High → Low</option>
        <option value="term">Term (Trial/Month/Year)</option>
        <option value="end-date">End Date (Soonest)</option>
      </select>
    </div>
  );
};

export default SortSubscriptionSelect;
