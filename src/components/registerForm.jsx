import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .max(10)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Calling the backend service with values :", this.state.data);
  };

  render() {
    return (
      <>
        <h1>Register </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", true, "text", true)}
            {this.renderInput("password", "Password", false, "password", true)}
            {this.renderInput("name", "Name", false, "text", true)}
            {this.renderButton("Register")}
          </form>
        </div>
      </>
    );
  }
}

export default RegisterForm;
