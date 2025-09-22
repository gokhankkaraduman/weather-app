import SearchInput from "./SearchInput";
import styles from "./SearchForm.module.css";

export default function SearchForm({ onSelect }) {
  return (
    <div className={styles.searchForm}>
      <h1 className={styles.title}>Where Do You Want to Check the Weather?</h1>
      <SearchInput onSelect={onSelect} />
    </div>
  );
}
