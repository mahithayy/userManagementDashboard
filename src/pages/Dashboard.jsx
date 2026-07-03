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
const [currentPage, setCurrentPage] = useState(1);
const [usersPerPage, setUsersPerPage] = useState(10);
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

 const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

const handleLimitChange = (event) => {
  setUsersPerPage(Number(event.target.value));
  setCurrentPage(1); // Reset to first page when limit changes
};


  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Toolbar
          searchTerm={searchTerm}
         onSearchChange={(term) => {
            setSearchTerm(term);
            setCurrentPage(1); // Reset to first page on new search
          }}
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
          users={currentUsers}
          onDelete={handleDeleteUser}
          onEdit={handleEditClick}
        />
        <div className="pagination-controls" style={{ display: 'flex', gap: '15px', marginTop: '20px', alignItems: 'center' }}>
          <div>
            <label>Users per page: </label>
            <select value={usersPerPage} onChange={handleLimitChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  </>
  );
}

export default Dashboard;