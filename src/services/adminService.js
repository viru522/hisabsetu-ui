import API from "./api";

export const getUsers = () =>
  API.get("/admin/users");

export const promoteUser = (id) =>
  API.put(`/admin/promote/${id}`);

export const deleteUser = (id) =>
  API.delete(`/admin/delete/${id}`);