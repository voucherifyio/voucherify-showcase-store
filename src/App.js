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
import "voucherify.js";

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  toastClassName: "text-xl text-white bg-dark text-center p-3 shadow-none",
  progressClassName: "bg-white opacity-25",
  closeButton: false,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
};

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  window.Voucherify.initialize(
    process.env.REACT_APP_FRONTEND_APPLICATION_ID,
    process.env.REACT_APP_FRONTEND_CLIENT_SECRET_KEY); // let's move it before App. Now voucherify is initialized on EVERY App render.

  return (
    <>
      <div className="d-none d-md-block">
        <div className={sidebar ? "d-flex" : "d-flex toggled"} id="wrapper">
          <div id="page-content-wrapper">
            <React.Fragment>
              <div className="mainContent">
                <Navigation sidebar={sidebar} handleSidebar={toggleSidebar} />

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
          <Sidebar />
        </div>
      </div>
      <div
        id="no-mobile"
        className="d-flex d-md-none align-content-center justify-content-center"
      >
        <div className="d-flex flex-column justify-content-center align-items-center mt-auto mb-auto">
          <img className="mb-3" src="/logo.svg" width="150" alt="Hot Beans" />
          <h2 className="text-center">
            <a className="voucherify-link" href="https://voucherify.io">
              <b>Voucherify</b>
            </a>{" "}
            demostore is only avaliable on desktop
          </h2>
        </div>
      </div>
    </>
  );
};

export default App;
