import style from './UserCard.module.css';
import { FC, memo, useState } from 'react';
import { User } from '../../shared/types.ts';
interface Props {
  user: User;
  handleDeleteCallback: (phone: string) => void;
}

const UserCard = memo(({ user, handleDeleteCallback }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    picture: { thumbnail },
  } = user;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = () => {
    handleDeleteCallback(user.phone);
  };

  return (
    <div
      className={style.user_card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {isHovered && (
        <button onClick={handleDelete} className={style.delete_btn}></button>
      )}

      <div className={style.icon_block}>
        <img src={thumbnail} alt="" className={style.icon} />

        <div className={style.name_block}>
          <h1>
            {user.name.first} {user.name.last}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className={style.information_block}>
        <h3>Phone No</h3>
        <p>{user.phone}</p>
      </div>
      <div className={style.information_block}>
        <h3>Birthday</h3>
        <p>{user.dob.date}</p>
      </div>
      <div className={style.information_block}>
        <h3>Address</h3>
        <p>
          {user.location.city}, {user.location.state},{user.location.country}
        </p>
      </div>
    </div>
  );
});
export default UserCard;
