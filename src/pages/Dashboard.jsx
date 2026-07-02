import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import UserTable from "../components/UserTable/UserTable";
import Navbar from "../components/Navbar/Navbar";
//import SearchBar from "../components/SearchBar/SearchBar";
import Toolbar from "../components/Toolbar/Toolbar";
import UserForm from "../components/UserForm/UserForm";
function Dashboard() {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
const handleDeleteUser = async (id) => {
  try {
    await deleteUser(id);

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
useEffect(() => {
    fetchUsers();
  }, []);

const filteredUsers = users.filter((user) => {
  const fullName = user.name?.toLowerCase() || "";
  const email = user.email?.toLowerCase() || "";

  return (
    fullName.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase())
  );
});


  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Toolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <p>
          Showing {filteredUsers.length} of {users.length} users
        </p>

        <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
        <UserForm />
      </div>
  </>
  );
}

export default Dashboard;