import { useSearchContext } from '../../context/SearchContex';
import style from './Search.module.css';
import type { ChangeEvent } from 'react';
const Search = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className={style.input}
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
