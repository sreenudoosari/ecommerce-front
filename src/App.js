import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Products from "./components/products/products";
import AddProductForm from "./components/products/addProduct";
import ProductDetails from "./components/products/productDetails";
import Customers from "./components/customers";
import Orders from "./components/orders";
import NotFound from "./components/notFound";
import LoginForm from "./components/users/loginForm";
import RegisterForm from "./components/users/registerForm";
import Logout from "./components/users/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route
              path="/products"
              exact
              render={props => <Products {...props} user={this.state.user} />}
            />

            <ProtectedRoute path="/products/new" component={AddProductForm} />

            <Route path="/products/:id" exact component={ProductDetails} />
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
