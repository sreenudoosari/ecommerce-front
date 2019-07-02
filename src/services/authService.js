import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
http.setJwt(getToken());

function loginUrl() {
  return config.apiUrl + "/auth";
}

export async function login(email, password) {
  const response = await http.post(loginUrl(), { email, password });
  if (response && response.headers["x-auth-token"]) {
    const userToken = response.headers["x-auth-token"];
    localStorage.setItem(tokenKey, userToken);
    return true;
  } else {
    return false;
  }
}

export function loginWithJWT(token) {
  if (token) {
    localStorage.setItem(tokenKey, token);
    return true;
  } else {
    return false;
  }
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  getCurrentUser,
  getToken,
  logout
};
