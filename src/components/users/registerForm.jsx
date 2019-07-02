import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";
class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .max(10)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    const response = await userService.register(this.state.data);
    if (response && response.headers["x-auth-token"]) {
      auth.loginWithJWT(response.headers["x-auth-token"]);
      window.location = "/";
    }
  };

  render() {
    return (
      <>
        <h1>Register </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", true, "text", true)}
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
