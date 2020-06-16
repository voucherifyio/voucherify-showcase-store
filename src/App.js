import React, { useState } from "react";
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
import Sidebar from "./components/Sidebar/Sidebar";

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  toastClassName: "text-xl text-white bg-dark text-center p-3 shadow-none",
  progressClassName: "bg-white opacity-25",
  closeButton: false,
};

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className={sidebar ? "d-flex" : "d-flex toggled"} id="wrapper">
        <div id="page-content-wrapper">
          <React.Fragment>
            <div className="mainContent">
              <Navigation sidebar={sidebar} handleSidebar={handleSidebar} />
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/store" component={ProductList} />
                <Route path="/details/:productId" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route path="/success" component={SuccessPage} />
                <Route component={Default} />
              </Switch>
              <Modal />
              <Footer />
              <ToastContainer {...toastOptions} />
            </div>
          </React.Fragment>
        </div>
        <Sidebar sidebar={sidebar} />
      </div>
    </>
  );
};

export default App;
