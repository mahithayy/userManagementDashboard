import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserTable from "../components/UserTable/UserTable";
function Dashboard() {
  const [users, setUsers] = useState([]);
const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);



  return (
    <div>
      <h1>User Management Dashboard</h1>

      <p>Total Users: {users.length}</p>
      <UserTable users={users} />
    </div>
  );
}

export default Dashboard;