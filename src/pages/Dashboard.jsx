import { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, updateUser } from "../services/userService";
import UserTable from "../components/UserTable/UserTable";
import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import UserForm from "../components/UserForm/UserForm";
import FilterModal from "../components/FilterModal/FilterModal";
import { normalizeUser } from "../utils/helpers";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

function Dashboard() {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [showUserForm, setShowUserForm] = useState(false);
const [editingUser, setEditingUser] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [usersPerPage, setUsersPerPage] = useState(10);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
const [showFilters, setShowFilters] = useState(false);
const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });

const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const apiUsers = await getUsers();
      //console.log(data);
      const normalizedUsers = apiUsers.map(normalizeUser);

     setUsers(normalizedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };


const handleDeleteUser = async (id) => {
  try {
    setError(null);
    if(id<=10){
      await deleteUser(id);
    }
   setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  } catch (error) {
    setError("Failed to delete user. Please try again.");
    console.error("Failed to delete user:", error);
  }
};

const handleAddUser = async (newUser) => {
  try {
    setError(null);
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
    setError("Failed to add user. Please check your connection.");
    console.error("Failed to add user:", error);
  }
};

const handleUpdateUser = async (updatedUser) => {
  try {
    setError(null);
    if (updatedUser.id <= 10) {
      await updateUser(updatedUser.id, updatedUser);
    }

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
    setError("Failed to update user. Please try again.");
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

 const handleSortChange = (value) => {
    const [key, direction] = value.split('-');
    setSortConfig({ key, direction });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
    setCurrentPage(1); // Reset page on filter
  };
const searchValue = searchTerm.toLowerCase();

let processedUsers = users.filter((user) => {
    // 1. General Search
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const matchesSearch = fullName.includes(searchValue) || email.includes(searchValue);

    // 2. Advanced Filters
    const matchesFirst = user.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchesLast = user.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchesEmail = email.includes(filters.email.toLowerCase());
    const matchesDept = (user.department || "").toLowerCase().includes(filters.department.toLowerCase());

    return matchesSearch && matchesFirst && matchesLast && matchesEmail && matchesDept;
  });

  // 3. Sorting
  processedUsers.sort((a, b) => {
    let valA = a[sortConfig.key] || "";
    let valB = b[sortConfig.key] || "";

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = processedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(processedUsers.length / usersPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
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
          onSortChange={handleSortChange}
          onToggleFilters={() => setShowFilters(true)}
        />

        {showFilters && (
          <FilterModal
            currentFilters={filters}
            onApply={handleApplyFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        <p>Showing {processedUsers.length} of {users.length} users</p>

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

        <ErrorMessage message={error} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
      </div>
    </>
  );
}

export default Dashboard;