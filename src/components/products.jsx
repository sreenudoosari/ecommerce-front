import React, { Component } from "react";
import { getProducts } from "../services/fakeProductService";
class Products extends Component {
  state = {
    products: getProducts(),
    cartProducts: []
  };

  handleDeleteFromProducts = productToDelete => {
    const actualProducts = this.state.products;
    const filteredProducts = actualProducts.filter(
      product => product._id !== productToDelete._id
    );
    this.setState({ products: filteredProducts });
  };

  handleAddProductToCart = productToAdd => {
    const productsInCart = this.state.cartProducts;
    if (productsInCart.indexOf(productToAdd) === -1) {
      productsInCart.push(productToAdd);
    }
    this.setState({ cartProducts: productsInCart });
  };

  handleDeleteProductFromCart = productToDeleteFromCart => {
    const productsInCart = this.state.cartProducts;
    if (productsInCart.indexOf(productToDeleteFromCart) !== -1) {
      productsInCart.pop(productToDeleteFromCart);
    }
    this.setState({ cartProducts: productsInCart });
  };

  render() {
    const { length: count } = this.state.products;
    if (count === 0) return <p>No Products to show </p>;

    return (
      <React.Fragment>
        <button className="btn btn-primary">
          Number of products in cart
          <span className="badge badge-light m-2">
            {this.state.cartProducts.length}
          </span>
        </button>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => this.handleAddProductToCart(product)}
                    className="btn btn-success m-2"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => this.handleDeleteProductFromCart(product)}
                    className="btn btn-warning m-2"
                  >
                    Delete from Cart
                  </button>
                  <button
                    onClick={() => this.handleDeleteFromProducts(product)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Products;
