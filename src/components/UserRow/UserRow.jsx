function UserRow({ user, onDelete }) {
  const { firstName, lastName, email, department } = user;

  return (
    <tr>
      <td>{user.id}</td>

      <td>{firstName}</td>

      <td>{lastName}</td>

      <td>{email}</td>

      <td>{department || "-"}</td>

      <td>
        <button>Edit</button>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              `Delete ${firstName} ${lastName}?`
        );

        if (confirmed) {
          onDelete(user.id);
        }
      }}
    >
      Delete
    </button>
      </td>
    </tr>
  );
}

export default UserRow;