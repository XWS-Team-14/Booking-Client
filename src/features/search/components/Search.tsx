import { useState } from 'react';
import styles from '../styles/search.module.scss';
import { SearchParams } from '../types/SearchParams';
import SearchBar from './SearchBar';
import SearchData from './SearchData';

const Search = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>();

  function handleDataChange(newData: SearchParams | undefined) {
    setSearchParams(newData);
  }

  return (
    <div className={styles.searchContainer}>
      <SearchBar onDataChanged={handleDataChange} />
      <SearchData searchParams={searchParams} />
    </div>
  );
};

export default Search;
