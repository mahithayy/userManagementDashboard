import UserRow from "../UserRow/UserRow";
import "./UserTable.css";

function UserTable({ users }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;