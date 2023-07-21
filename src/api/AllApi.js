import axios from 'axios';

export const fetchDefaultUsers = async () => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
}

export const addUserToServer = async (user) => {
  const res = axios.post("http://localhost:5000/users", user);
  console.log("user add :", res);
  return res
}