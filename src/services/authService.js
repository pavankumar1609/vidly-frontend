import jwt_decode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
