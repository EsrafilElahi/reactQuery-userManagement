import axios from 'axios';

export const fetchDefaultUsers = async () => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
}

export const fetchSingleUser = async (id) => {
  const res = await axios.get(`http://localhost:5000/users/${id}`);
  return res.data;
}

export const addUserToServer = async (user) => {
  const res = axios.post("http://localhost:5000/users", user);
  return res.data
}

export const editSingleUser = async (user) => {
  const res = axios.put(`http://localhost:5000/users/${user.id}`, user);
  return res.data
}