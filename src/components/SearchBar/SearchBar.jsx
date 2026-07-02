function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchBar;