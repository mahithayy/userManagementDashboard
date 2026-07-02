function UserRow({ user, onDelete }) {
  const fullName = user.name || "";
  const nameParts = fullName.split(" ");

  const firstName = nameParts[0];

  const lastName = nameParts.slice(1).join(" ");

  return (
    <tr>
      <td>{user.id}</td>

      <td>{firstName}</td>

      <td>{lastName}</td>

      <td>{user.email}</td>

      <td>-</td>

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