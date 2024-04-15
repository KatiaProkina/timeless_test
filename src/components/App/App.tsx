import style from './App.module.css';
import Search from '../Search/Search';
import StatisticCard from '../StatisticCard/StatisticCard';
import UserArea from '../UsersArea/UsersArea';
import { useState } from 'react';
import type { MouseEvent } from 'react';
function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Search />

        <button type="button" className={style.btn} onClick={handleRefresh}>
          Refresh Users
        </button>
      </div>

      <div className={style.users}>
        <UserArea key={refreshKey} />

        <StatisticCard />
      </div>
    </div>
  );
}

export default App;
