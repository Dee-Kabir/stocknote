import { API } from "../Config";
import cookie from "js-cookie";
export const register = async ({ name, email, password }) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signin = ({ email, password }) => {
  return fetch(`${API}/login`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const isAuthenticated = () => {
  let auth = JSON.parse(window.localStorage.getItem("auth"));
  if (auth && auth.token) {
    return true;
  } else {
    return false;
  }
};
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};
