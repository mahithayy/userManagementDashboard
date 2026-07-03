import "./Toolbar.css";
import SearchBar from "../SearchBar/SearchBar";

function Toolbar({
  searchTerm,
  onSearchChange,
  onAddUser,
}) {
  return (
    <div className="toolbar">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <select>
        <option>Sort</option>
      </select>

      <button>Filters</button>

      <button onClick={onAddUser}>
        Add User
      </button>
    </div>
  );
}

export default Toolbar;