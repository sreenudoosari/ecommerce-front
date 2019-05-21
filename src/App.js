import React, { Component } from "react";
import "./App.css";
import Products from "./components/products";
class App extends Component {
  render() {
    return (
      <main className="container">
        <Products />
      </main>
    );
  }
}

export default App;
