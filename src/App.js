import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Details from "./components/Details";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import SuccessPage from "./components/SuccessPage";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  toastClassName: "text-xl text-white bg-dark text-center p-3 shadow-none",
  progressClassName: "bg-white opacity-25",
  closeButton: false,
};

const App = (sidebar) => {
  return (
    <React.Fragment>
      <div
        className="mainContent"
        style={
          sidebar.isSidebarOpen
            ? { marginLeft: 350 + "px" }
            : { marginLeft: 0 + "px" }
        }
      >
        <Navigation />
        <Switch>
          <Route exact path="/" component={MainPage}></Route>
          <Route path="/products" component={ProductList}></Route>
          <Route path="/details/:productId" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/success" component={SuccessPage}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal />
        <Footer />
        <ToastContainer {...toastOptions} />
      </div>
    </React.Fragment>
  );
};

export default App;
