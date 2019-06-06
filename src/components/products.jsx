import React, { Component } from "react";
import _ from "lodash";
import { getProducts } from "../services/fakeProductService";
import { getCategories } from "../services/fakeCategoryService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import ProductsTable from "./productsTable";
import Cart from "./common/cart";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    pageSize: 4,
    currentPage: 1,
    selectedCategory: { name: "All Categories" },
    sortColumn: { colName: "name", order: "asc" }
  };

  componentDidMount() {
    const products = getProducts();
    const categories = [
      { _id: "", name: "All Categories" },
      ...getCategories()
    ];
    this.setState({ products, categories });
  }

  handleDeleteFromProducts = productToDelete => {
    const actualProducts = this.state.products;
    const filteredProducts = actualProducts.filter(
      product => product._id !== productToDelete._id
    );
    this.setState({ products: filteredProducts });
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

  getData = () => {
    const {
      products: allProducts,
      currentPage,
      selectedCategory,
      pageSize,
      sortColumn
    } = this.state;
    //filter the products basing on category
    const filteredProductsList = selectedCategory._id
      ? allProducts.filter(p => p.category._id === selectedCategory._id)
      : allProducts;
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
    const { currentPage, pageSize, sortColumn } = this.state;
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
          <ProductsTable
            products={result.data}
            onAddToCart={this.handleAddProductToCart}
            onDeleteFromCart={this.handleDeleteProductFromCart}
            onDeleteFromTable={this.handleDeleteFromProducts}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
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
