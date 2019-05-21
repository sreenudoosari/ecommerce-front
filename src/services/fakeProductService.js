const products = [
  { _id: 1, name: "product1", price: 12, image: "https://picsum.photos/50" },
  { _id: 2, name: "product2", price: 13, image: "https://picsum.photos/50" },
  { _id: 3, name: "product3", price: 14, image: "https://picsum.photos/50" }
];

export function getProducts() {
  return products;
}
