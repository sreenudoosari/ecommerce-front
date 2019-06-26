import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as productService from "../../services/productService";
import Form from "../common/form";

class ProductDetails extends Form {
  state = {
    data: {
      name: "",
      price: "",
      category: ""
    },
    categories: [],
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    price: Joi.number()
      .required()
      .label("Price"),
    category: Joi.string()
      .required()
      .label("Category")
  };

  async componentDidMount() {
    const response = await productService.getProductWithId(
      this.props.match.params.id
    );
    if (!response) return this.props.history.replace("/not-found");
    const { data: product } = response;
    const data = { ...this.state.data };
    data.name = product.name;
    data.price = product.price;
    data.category = product.category._id;
    const allCategories = this.props.location.categories;
    const categories = allCategories
      .filter(c => c._id)
      .map(c => ({ name: c.name, value: c._id }));
    this.setState({ data, categories });
  }

  doSubmit = async () => {
    const data = { id: this.props.match.params.id, ...this.state.data };
    const response = await productService.updateProduct(data);
    if (response.status === 200) {
      toast.success("Successfully updated product");
      this.props.history.push("/products");
    }
  };

  render() {
    return (
      <>
        <h1>Details of product </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", true, "text", true)}
          {this.renderInput("price", "Price", false, "text", true)}
          {this.renderSelect(
            "category",
            "Category",
            this.state.categories,
            true
          )}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default ProductDetails;
