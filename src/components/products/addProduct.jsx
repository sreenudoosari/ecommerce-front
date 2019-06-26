import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";
import * as productsService from "../../services/productService";

class AddProductForm extends Form {
  state = {
    data: {
      name: "",
      price: "",
      category: ""
    },
    categories: [],
    errors: {}
  };
  componentDidMount() {
    const allCategories = this.props.location.state.categories;
    const categories = allCategories
      .filter(c => c._id)
      .map(c => ({ name: c.name, value: c._id }));
    this.setState({ categories });
  }
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

  doSubmit = async () => {
    const response = await productsService.createProduct(this.state.data);
    if (response.status === 201) {
      toast.success("Successfully created new product");
      this.props.history.push("/products");
    }
  };

  render() {
    return (
      <>
        <h1>Add Product </h1>
        <div>
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
        </div>
      </>
    );
  }
}

export default AddProductForm;
