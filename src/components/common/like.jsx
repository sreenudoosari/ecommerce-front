import React, { Component } from "react";
//This component should be a reusable component
//So place it common folder
//* INPUT */
//As an input it should  accept  liked/disliked ( boolean) value
//inorder to show the  empty heart icon or full heart icon

//* OUTPUT */
//It should emit an event as output so that the component which is using this
//can handle it and do the necessary ( for eg: update the state to store whether the
// product is liked or not)

//Note : this can also be a stateless functional component
class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        className={classes}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
