import UserCard from "../UserCard/UserCard";
import { User } from "../../interfaces/user";
import "./UserList.css";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        users.map((user, index) => <UserCard key={index} user={user} />)
      )}
    </div>
  );
};

export default UserList;
