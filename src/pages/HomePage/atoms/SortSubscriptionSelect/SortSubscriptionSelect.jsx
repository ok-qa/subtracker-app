import { sortOptions } from "../../../../constants";
import { useSubscriptions } from "../../../../context/SubscriptionContext";
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
        {sortOptions.map((sortOption) => (
          <option value={sortOption.value}>{sortOption.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SortSubscriptionSelect;
