import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";
import * as productsService from "../../services/productService";
import { getCategories } from "../../services/categoryService";

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
  async componentDidMount() {
    let allCategories = [];
    if (this.props.location.state && this.props.location.state.categories) {
      allCategories = this.props.location.state.categories;
    } else {
      const { data: categories } = await getCategories();
      allCategories = categories;
    }
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
    if (response && response.status === 201) {
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
