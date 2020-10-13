import { apiUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
  const tokenKey = "token";
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/users/login`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
};
