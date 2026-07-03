import { useState} from "react";
import "./UserForm.css";
import { validateUser } from "../../utils/validators";

function UserForm({onCancel, onSubmit, initialData,}) {
  const emptyUser = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

const [formData, setFormData] = useState(
  initialData || emptyUser
);
const [errors, setErrors] = useState({});

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();
const isEditing = !!initialData;
const validationErrors = validateUser(formData, isEditing);


  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  onSubmit({
  ...formData,
  id: initialData?.id,
});

  setFormData({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});
};

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <h2>
        {initialData ? "Edit User" : "Add User"}
      </h2>

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
        {initialData ? "Update User" : "Save User"}
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