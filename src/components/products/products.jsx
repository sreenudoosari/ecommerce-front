import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import * as productService from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../../utils/paginate";
import ProductsTable from "./productsTable";
import Cart from "../common/cart";
import SearchBox from "../common/searchBox";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    pageSize: 4,
    currentPage: 1,
    selectedCategory: { name: "All Categories" },
    sortColumn: { colName: "name", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const { data: products } = await productService.getProducts();
    const allProducts = products.map(p => ({ ...p, numOfItemsInCart: 0 }));
    const { data: categories } = await getCategories();
    const allCategories = [{ _id: "", name: "All Categories" }, ...categories];
    this.setState({ products: allProducts, categories: allCategories });
  }

  handleDeleteFromProducts = async productToDelete => {
    const actualProducts = this.state.products;
    const filteredProducts = actualProducts.filter(
      product => product._id !== productToDelete._id
    );
    this.setState({ products: filteredProducts });
    const response = await productService.deleteProduct(productToDelete._id);
    if (response && response.status === 200) {
      toast.success(`Successfully deleted ${productToDelete.name}.`);
    } else {
      this.setState({ products: actualProducts });
    }
  };

  handleAddProductToCart = productToAdd => {
    const products = [...this.state.products];
    const index = products.indexOf(productToAdd);
    products[index].numOfItemsInCart++;
    this.setState({ products });
  };

  handleDeleteProductFromCart = productToDeleteFromCart => {
    const products = [...this.state.products];
    const index = products.indexOf(productToDeleteFromCart);
    products[index].numOfItemsInCart--;

    this.setState({ products });
  };

  getTotalNumOfItemsInCart() {
    return this.state.products.reduce((a, c) => a + c.numOfItemsInCart, 0);
  }

  handleLike = likedProduct => {
    const products = [...this.state.products];
    const index = products.indexOf(likedProduct);
    products[index].liked = !products[index].liked;
    this.setState({ products });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectCategory = category => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleAddProduct = () => {
    this.props.history.push("/products/new", {
      categories: this.state.categories
    });
  };

  handleSearch = query => {
    if (query) {
      this.setState({
        searchQuery: query,
        selectedCategory: "",
        currentPage: 1
      });
    } else {
      this.setState({
        searchQuery: query,
        selectedCategory: { name: "All Categories" },
        currentPage: 1
      });
    }
  };

  getData = () => {
    const {
      products: allProducts,
      currentPage,
      selectedCategory,
      pageSize,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredProductsList = allProducts;
    if (searchQuery) {
      filteredProductsList = allProducts.filter(p =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory._id) {
      //filter the products basing on category
      filteredProductsList = allProducts.filter(
        p => p.category._id === selectedCategory._id
      );
    }

    //sort the products
    const sortedProducts = _.orderBy(
      filteredProductsList,
      [sortColumn.colName],
      [sortColumn.order]
    );
    //paginate the products
    const paginatedProducts = paginate(sortedProducts, currentPage, pageSize);
    return { data: paginatedProducts, totalLength: sortedProducts.length };
  };

  render() {
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      categories
    } = this.state;
    const { user } = this.props;
    const result = this.getData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            onSelectItem={this.handleSelectCategory}
            selectedItem={this.state.selectedCategory}
          />
        </div>
        <div className="col">
          <Cart totalNumOfItems={this.getTotalNumOfItemsInCart()} />
          {user && user.isAdmin && (
            <button onClick={this.handleAddProduct} className="btn btn-success">
              Add Product
            </button>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ProductsTable
            products={result.data}
            onAddToCart={this.handleAddProductToCart}
            onDeleteFromCart={this.handleDeleteProductFromCart}
            onDeleteFromTable={this.handleDeleteFromProducts}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            categories={categories}
            user={user}
          />
          <Pagination
            itemsCount={result.totalLength}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Products;
