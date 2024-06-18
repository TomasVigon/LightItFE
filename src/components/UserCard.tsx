import { useState } from 'react';
import { User } from '../interfaces/user';

const UserCard = ({ user }: {user: User}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="user-card" onClick={toggleExpand}>
      <div className="user-header">
        {!!user.photo && <img src={URL.createObjectURL(user.photo)} alt="Document" style={{ maxHeight: '100px', maxWidth: '100px' }}/>}
        <h3>{user.name}</h3>
      </div>
      {isExpanded && (
        <div className="user-details">
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
