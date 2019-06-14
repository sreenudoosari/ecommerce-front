import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;
    const result = Joi.validate(data, this.schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    //validation
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    //set values in state
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty({ name, value }) {
    const objToValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(objToValidate, schema);
    return error ? error.details[0].message : null;
  }

  handleSubmit = e => {
    //prevent the default submission of the form
    //this will prevent the complete page reload
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    autoFocus = false,
    type = "text",
    obligatory = false
  ) {
    const { data, errors } = this.state;

    return (
      <Input
        obligatory={obligatory}
        type={type}
        name={name}
        label={label}
        autoFocus={autoFocus}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, items, obligatory = false) {
    const { data, errors } = this.state;

    return (
      <Select
        obligatory={obligatory}
        name={name}
        value={data[name]}
        label={label}
        items={items}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
    // return (
    //   <select className="custom-select custom-select-sm">
    //     <option selected>select category</option>
    //     {items.map(item => (
    //       <option value={item.value}>{item.name}</option>
    //     ))}
    //   </select>
    // );
  }
}

export default Form;
