import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getSelectCategoriesList } from "../../services/fakeCategoryService";
import * as productsService from "../../services/fakeProductService";

class AddProductForm extends Form {
  state = {
    data: {
      name: "",
      price: "",
      category: ""
    },
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

  doSubmit = () => {
    console.log("Calling the backend service with values :", this.state.data);
    productsService.createProduct(this.state.data);
    this.props.history.push("/products");
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
              getSelectCategoriesList(),
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
