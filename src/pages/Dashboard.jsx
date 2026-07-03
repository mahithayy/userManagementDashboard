import { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, updateUser } from "../services/userService";
import UserTable from "../components/UserTable/UserTable";
import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import UserForm from "../components/UserForm/UserForm";
import { normalizeUser } from "../utils/helpers";

function Dashboard() {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [showUserForm, setShowUserForm] = useState(false);
const [editingUser, setEditingUser] = useState(null);

const fetchUsers = async () => {
    try {
      const apiUsers = await getUsers();
      //console.log(data);
      const normalizedUsers = apiUsers.map(normalizeUser);

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

const handleAddUser = async (newUser) => {
  try {
    await addUser(newUser);

    const nextId =
      users.length > 0
        ? Math.max(...users.map(user => user.id)) + 1
        : 1;
    const userToAdd = {
      ...newUser,
      id:
        nextId,
    };

    setUsers((prevUsers) => [
      ...prevUsers,
      userToAdd,
    ]);

    setShowUserForm(false);
  } catch (error) {
    console.error("Failed to add user:", error);
  }
};

const handleUpdateUser = async (updatedUser) => {
  try {
    await updateUser(updatedUser.id, updatedUser);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    setEditingUser(null);
    setShowUserForm(false);
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

const handleEditClick = (user) => {
  setEditingUser(user);
  setShowUserForm(true);
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
            initialData={editingUser}
            onCancel={() => {
              setEditingUser(null);
              setShowUserForm(false);
            }}
            onSubmit={
              editingUser
                ? handleUpdateUser
                : handleAddUser
            }
          />
        )}

        <UserTable
          users={filteredUsers}
          onDelete={handleDeleteUser}
          onEdit={handleEditClick}
        />
      </div>
  </>
  );
}

export default Dashboard;