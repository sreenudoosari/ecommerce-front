import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import Products from "./components/products";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 2 },
      { id: 3, value: 4 },
      { id: 4, value: 6 },
      { id: 5, value: 8 }
    ]
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value++;
    this.setState({ counters });
  };

  handleDelete = id => {
    console.log("handle delete in countersssssssss.jsx :", id);
    const filteredCounters = this.state.counters.filter(c => c.id !== id);
    this.setState({ counters: filteredCounters });
  };

  handleReset = () => {
    const resetCountersList = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    console.log("handle reset : ", resetCountersList);
    this.setState({ counters: resetCountersList });
  };

  getTotalCount() {
    return this.state.counters.reduce((a, c) => a + c.value, 0);
  }

  render() {
    return (
      <div>
        <NavBar totalCount={this.getTotalCount()} />
        <main className="container">
          <Products />
        </main>
      </div>
    );
  }
}

export default App;

//Display

//Table of products  (image (not from picsum , ))
//get products information from  'fakeProductsService'

//Actions

//add to cart , delete from cart , Increment , Decrement
//Empty Cart

//Twitter comment : How do you feel learning react
// @reactjs   @JavaScript  @SreenuDoosari
