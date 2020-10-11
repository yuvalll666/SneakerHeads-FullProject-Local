import { apiUrl } from "../config.json";
import http from "./httpService";

const tokenKey = "token";

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/users/login`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, data.token);
}

export default {};
