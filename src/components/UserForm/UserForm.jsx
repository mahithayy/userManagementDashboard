import { useState } from "react";
import "./UserForm.css";
import { validateUser } from "../../utils/validators";

function UserForm({onCancel}) {
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});

const [errors, setErrors] = useState({});

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();

  const validationErrors = validateUser(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  console.log(formData);
};

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Add User</h2>

      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

       {errors.firstName && (
          <p className="error">
            {errors.firstName}
          </p>
        )}

      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && (
          <p className="error">
            {errors.lastName}
          </p>
        )}

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && (
          <p className="error">
            {errors.email}
          </p>
        )}

      <input
        type="text"
        placeholder="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />
      {errors.department && (
          <p className="error">
            {errors.department}
          </p>
        )}

      <button
        type="submit"
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