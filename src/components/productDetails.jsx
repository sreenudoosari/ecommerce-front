import React, { Component } from "react";

class ProductDetails extends Component {
  state = {};
  handleSave = () => {
    this.props.history.push("/products");
  };
  render() {
    return (
      <>
        <h1>Details of product with id : {this.props.match.params.id} </h1>
        <button onClick={this.handleSave} className="btn btn-primary m-2">
          Save
        </button>
      </>
    );
  }
}

export default ProductDetails;
