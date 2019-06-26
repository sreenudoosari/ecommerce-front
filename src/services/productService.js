import http from "./httpService";
import config from "../config.json";

function productUrl(id) {
  return config.apiUrl + "/products" + (id ? "/" + id : "");
}

export function getProducts() {
  return http.get(productUrl());
}

export function getProductWithId(id) {
  return http.get(productUrl(id));
}

export function deleteProduct(id) {
  return http.delete(productUrl(id));
}

export function createProduct(product) {
  return http.post(productUrl(), product);
}

export function updateProduct(product) {
  return http.put(productUrl(product.id), product);
}
