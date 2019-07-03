import http from "./httpService";
import config from "../config.json";

export function getCategories() {
  return http.get(process.env.REACT_APP_API_URL + "/categories");
}

export async function getSelectCategoriesList() {
  const categories = await http.get(config.apiUrl + "/categories");
  return categories.map(c => ({ name: c.name, value: c._id }));
}
