import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../HotBeansLogo.svg";
import { ProductConsumer } from "./Context";
import { CustomerConsumer } from "./CustomerContext";
import SidebarButton from "./SidebarButton";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className={sidebarOpen ? "" : "msb-x"}>
        <Sidebar/>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="mnb navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <SidebarButton onClick={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Hot Beans
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Store
              </Link>
            </li>
          </ul>
          <CustomerConsumer>
            {(ctx) => {
              if (ctx.customer !== null) {
                return (
                  <span className="font-weight-bold">{ctx.customer.name}</span>
                );
              }
            }}
          </CustomerConsumer>
          <Link to="/cart">
            <span className="btn" type="button">
              <i className="fas fa-shopping-cart"></i>&nbsp;
              <ProductConsumer>
                {(ctx) => {
                  if (ctx.cart.length > 0) {
                    const countTotalItems = ctx.cart.reduce((acc, curr) => (acc + curr.count), 0);
                    return (
                      <span className="badge badge-pill badge-warning">
                        {countTotalItems}
                      </span>
                    );
                  }
                }}
              </ProductConsumer>
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
