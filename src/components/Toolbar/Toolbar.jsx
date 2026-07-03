import "./Toolbar.css";
import SearchBar from "../SearchBar/SearchBar";

function Toolbar({
  searchTerm,
  onSearchChange,
  onAddUser,
  onSortChange,
  onToggleFilters
}) {
  return (
    <div className="toolbar">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="id-asc">Sort by ID (Asc)</option>
        <option value="id-desc">Sort by ID (Desc)</option>
        <option value="firstName-asc">First Name (A-Z)</option>
        <option value="firstName-desc">First Name (Z-A)</option>
        <option value="department-asc">Department (A-Z)</option>
      </select>

      <button onClick={onToggleFilters}>
        Filters
      </button>

      <button onClick={onAddUser}>
        Add User
      </button>
    </div>
  );
}

export default Toolbar;