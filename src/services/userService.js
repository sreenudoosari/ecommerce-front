import http from "./httpService";
import config from "../config.json";

function userUrl() {
  return config.apiUrl + "/users";
}

export function register(user) {
  return http.post(userUrl(), user);
}
