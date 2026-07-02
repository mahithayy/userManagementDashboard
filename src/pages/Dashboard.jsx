import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  return (
    <div>
      <h1>User Management Dashboard</h1>

      <p>Total Users: {users.length}</p>
    </div>
  );
}

export default Dashboard;