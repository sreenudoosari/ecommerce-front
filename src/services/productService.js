import http from "./httpService";

function productUrl(id) {
  return process.env.REACT_APP_API_URL + "/products" + (id ? "/" + id : "");
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
