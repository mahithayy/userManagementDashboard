import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import UserTable from "../components/UserTable/UserTable";
import Navbar from "../components/Navbar/Navbar";
//import SearchBar from "../components/SearchBar/SearchBar";
import Toolbar from "../components/Toolbar/Toolbar";
import UserForm from "../components/UserForm/UserForm";
import { normalizeUser } from "../utils/helpers";
function Dashboard() {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [showUserForm, setShowUserForm] = useState(false);
const fetchUsers = async () => {
    try {
      const data = await getUsers();
      //console.log(data);
      const normalizedUsers = data.map(normalizeUser);

     setUsers(normalizedUsers);
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
const searchValue = searchTerm.toLowerCase();

const filteredUsers = users.filter((user) => {
  const fullName =
  `${user.firstName} ${user.lastName}`.toLowerCase();
  const email = user.email?.toLowerCase() || "";

  return (
    fullName.includes(searchValue) ||
    email.includes(searchValue)
  );
});


  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Toolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddUser={() => setShowUserForm(true)}
        />

        <p>
          Showing {filteredUsers.length} of {users.length} users
        </p>

        {showUserForm && (
          <UserForm
            onCancel={() => setShowUserForm(false)}
          />
        )}

        <UserTable
          users={filteredUsers}
          onDelete={handleDeleteUser}
        />
      </div>
  </>
  );
}

export default Dashboard;