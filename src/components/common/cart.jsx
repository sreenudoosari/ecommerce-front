import React from "react";

//We can destructure the props object in the parameter itself
// so we dont need to do
// const { totalNumOfItems } = props;
// inside the function
const Cart = ({ totalNumOfItems }) => {
  return (
    <button className="btn btn-primary pull-right">
      <i className="fa fa-shopping-cart" aria-hidden="true" />
      <span className="badge badge-light m-2">{totalNumOfItems}</span>
    </button>
  );
};

export default Cart;
