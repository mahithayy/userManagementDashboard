import "./UserForm.css";

function UserForm({onCancel}) {
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