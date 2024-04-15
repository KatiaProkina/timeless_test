import { useCallback, useEffect, useState } from 'react';
import style from './UserArea.module.css';
import UserCard from '../UserCard/UserCard';
import { useGetUsersQuery } from '../../store/usersApi';
import { useSearchContext } from '../../context/SearchContex';
import { useDebounce } from 'use-debounce';
import { User } from '../../shared/types.ts';

const TIMER = 500;

const UserArea = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery();
  const { searchQuery } = useSearchContext();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [debouncedSearchQuery] = useDebounce(searchQuery, TIMER);

  const handleDeleteUser = useCallback((phone: string) => {
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.phone !== phone)
    );
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.results.filter((user: User) =>
        Object.values(user).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setFilteredUsers(filtered);
    }
  }, [data, debouncedSearchQuery]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <div className={style.users_area}>
      <div className={style.users}>
        {filteredUsers.length === 0 ? (
          <p className={style.no_result}>Нет результатов</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.phone}
              user={user}
              handleDeleteCallback={handleDeleteUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserArea;
