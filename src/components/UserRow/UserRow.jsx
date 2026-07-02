function UserRow({ user }) {
  const nameParts = user.name.split(" ");

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

        <button>Delete</button>
      </td>
    </tr>
  );
}

export default UserRow;