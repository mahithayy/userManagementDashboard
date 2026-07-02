import "./UserForm.css";

function UserForm() {
  return (
    <form className="user-form">
      <h2>Add User</h2>

      <input
        type="text"
        placeholder="First Name"
      />

      <input
        type="text"
        placeholder="Last Name"
      />

      <input
        type="email"
        placeholder="Email"
      />

      <input
        type="text"
        placeholder="Department"
      />

      <button type="submit">
        Save User
      </button>
    </form>
  );
}

export default UserForm;