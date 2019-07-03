import http from "./httpService";

function userUrl() {
  return process.env.REACT_APP_API_URL + "/users";
}

export function register(user) {
  return http.post(userUrl(), user);
}
