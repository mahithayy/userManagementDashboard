export function validateUser(user, isEditing = false) {
  const errors = {};

  if (!user.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!user.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!user.email.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      errors.email = "Enter a valid email address.";
    }
  }

 if (!isEditing && (!user.department || !user.department.trim())) {
    errors.department = "Department is required.";
  }

  return errors;
}