import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";
class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { data } = this.state;
    const success = await auth.login(data.email, data.password);
    if (success) {
      window.location = "/";
    }
  };

  render() {
    if (auth.getCurrentUser) return <Redirect to="/" />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
