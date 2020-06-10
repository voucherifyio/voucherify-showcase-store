import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "./Context";
import { CustomerConsumer } from "./CustomerContext";

const Navbar = ({ sidebar }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                Hot Beans
              </Link>
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
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Store
              </Link>
            </li>
          </ul>
          <div>
            <span className="btn" type="button">
              <CustomerConsumer>
                {(ctx) => {
                  if (ctx.customer !== null) {
                    return (
                      <span className="font-weight-bold">
                        {ctx.customer.name}
                      </span>
                    );
                  }
                }}
              </CustomerConsumer>
            </span>
          </div>
          <div>
            <Link to="/cart">
              <span className="btn" type="button">
                <i className="fas fa-shopping-cart"></i>&nbsp;
                <ProductConsumer>
                  {(ctx) => {
                    if (ctx.cart.length > 0) {
                      const countTotalItems = ctx.cart.reduce(
                        (acc, curr) => acc + curr.count,
                        0
                      );
                      return (
                        <span className="badge badge-secondary badge-pill">
                          {countTotalItems}
                        </span>
                      );
                    }
                  }}
                </ProductConsumer>
              </span>
            </Link>
          </div>
          <div>
            <span id="menu-toggle"className="btn" type="button" 
            onClick={sidebar}
            >
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
