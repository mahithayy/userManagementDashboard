import axiosInstance from "../api/axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const addUser = async (user) => {
  const response = await axiosInstance.post("/users", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/users/${id}`);
};