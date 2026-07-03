export function normalizeUser(user) {
  const nameParts = (user.name || "").trim().split(" ");

  return {
    id: user.id,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" "),
    email: user.email || "",
    department: user.company?.name || "",
  };
}