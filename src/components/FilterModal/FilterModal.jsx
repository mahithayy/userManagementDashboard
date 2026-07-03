import { useState } from "react";
import "./FilterModal.css";

function FilterModal({ currentFilters, onApply, onClose }) {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const handleChange = (event) => {
    setLocalFilters({ ...localFilters, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(localFilters);
  };

  return (
    <div className="filter-modal-overlay">
      <form className="filter-modal" onSubmit={handleSubmit}>
        <h3>Filter Users</h3>
        <input name="firstName" placeholder="First Name" value={localFilters.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={localFilters.lastName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={localFilters.email} onChange={handleChange} />
        <input name="department" placeholder="Department" value={localFilters.department} onChange={handleChange} />
        <div className="filter-actions">
          <button type="submit">Apply</button>
          <button type="button" onClick={onClose}>Close</button>
          <button type="button" onClick={() => setLocalFilters({ firstName: '', lastName: '', email: '', department: '' })}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default FilterModal;