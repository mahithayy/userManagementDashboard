import { useState } from "react";
import "./UserForm.css";


function UserForm({onCancel}) {
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  return (
    <form className="user-form">
      <h2>Add User</h2>

      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />

      <button
        type="submit"
        onClick={(e) => {
            e.preventDefault();

            console.log(formData);
          }}
     >
        Save User
     </button>
      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default UserForm;