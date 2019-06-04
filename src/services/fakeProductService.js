const products = [
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    name: "Samsung Tablet",
    price: 100,
    category: { _id: "5b21ca3eeb7f6fbccd471811", name: "Informatique" },
    image: require("../data/images/samsungTab.jpeg"),
    numOfItemsInCart: 0,
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    name: "Aspirateur Miele",
    price: 150,
    category: { _id: "5b21ca3eeb7f6fbccd471812", name: "MaisonEntretien" },
    image: require("../data/images/aspMiele.jpeg"),
    numOfItemsInCart: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    name: "Centrale vapeur Calor",
    price: 75,
    category: { _id: "5b21ca3eeb7f6fbccd471813", name: "MaisonEntretien" },
    image: require("../data/images/calor.jpeg"),
    numOfItemsInCart: 0
  },
  {
    _id: "5b21ca3eeb7f6fbccd471824",
    name: "Lave linge Electrolux",
    price: 400,
    category: { _id: "5b21ca3eeb7f6fbccd471824", name: "Electromenager" },
    image: require("../data/images/lavalange.jpeg"),
    numOfItemsInCart: 0,
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471825",
    name: "Lave vaisselle Hotpoint",
    price: 300,
    category: { _id: "5b21ca3eeb7f6fbccd471825", name: "Electromenager" },
    image: require("../data/images/laveVaisselle.jpeg"),
    numOfItemsInCart: 0
  }
];

export function getProducts() {
  return products;
}
