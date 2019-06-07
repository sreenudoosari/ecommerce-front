import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Products from "./components/products";
import ProductDetails from "./components/productDetails";
import Customers from "./components/customers";
import Orders from "./components/orders";
import NotFound from "./components/notFound";
import "./App.css";

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
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Redirect from="/" exact to="/products" />
            <Route path="/notFound" component={NotFound} />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
