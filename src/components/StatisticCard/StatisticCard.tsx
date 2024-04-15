import { useCallback, useMemo } from 'react';
import { useGetUsersQuery } from '../../store/usersApi';
import style from './Statistic.module.css';
import { User } from '../../shared/types.ts';

const initialTotalUserCount = 0;

const StatisticCard = () => {
  const { data } = useGetUsersQuery();

  const users = data?.results || [];
  const totalUsersCount = data?.info?.results || initialTotalUserCount;

  const calculateGenderGroups = useCallback((users: User[]) => {
    const updatedGenderGroups = { male: 0, female: 0 };

    users.forEach((user) => {
      const gender: 'male' | 'female' = user.gender;

      updatedGenderGroups[gender]++;
    });

    return updatedGenderGroups;
  }, []);

  const getAgeGroup = (age: number): string => {
    if (age >= 11 && age <= 20) {
      return '11-20';
    } else if (age >= 21 && age <= 30) {
      return '21-30';
    } else if (age >= 31 && age <= 40) {
      return '31-40';
    } else if (age >= 41 && age <= 50) {
      return '41-50';
    } else {
      return '51+';
    }
  };

  const calculateAgeGroups = useCallback((users: User[]) => {
    const ageGroups: { [key: string]: number } = {
      '11-20': 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51+': 0,
    };

    users.forEach((user) => {
      const age = parseInt(user.dob.age);
      const group = getAgeGroup(age);

      ageGroups[group]++;
    });

    return ageGroups;
  }, []);

  const userInfo = useMemo(() => {
    const genderGroups = calculateGenderGroups(users);
    const ageGroups = calculateAgeGroups(users);

    return { genderGroups, ageGroups };
  }, [calculateAgeGroups, calculateGenderGroups, users]);

  return (
    <div className={style.statistic_area}>
      <div className={style.users}>
        <h1>{totalUsersCount} users</h1>
      </div>

      <div className={style.age_groups}>
        <h2>Age groups</h2>

        {Object.entries(userInfo.ageGroups).map(([group, count]) => (
          <div className={style.information_group} key={group}>
            <h3>{group}</h3>
            <p>{count} users</p>
          </div>
        ))}
      </div>
      <div className={style.gender_groups}>
        <h2>Gender groups</h2>

        {Object.entries(userInfo.genderGroups).map(([gender, count]) => (
          <div className={style.information_group} key={gender}>
            <h3>{gender}</h3>
            <p>{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticCard;
