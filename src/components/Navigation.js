import React from "react";
import { Link } from "react-router-dom";
import Logo from "../HotBeansLogo.svg";
import { ProductConsumer } from "./Context";
import { CustomerConsumer} from "./CustomerContext"
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="mnb navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
              onClick={() => {
                document.body.classList.toggle("msb-x");
              }}
            >
              <span className="sr-only">Toggle navigation</span>
              <i className="ic fa fa-bars"></i>
            </button>
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
        <Link to="/cart">
          <span className="btn" type="button">
            <i className="fas fa-shopping-cart"></i>&nbsp;
            <CustomerConsumer>
              {(ctx) => {
                if (ctx.customer !== []) {
                  return <span>{ctx.customer.name}</span>
                }
              }}
            </CustomerConsumer>
            <ProductConsumer>
              {(value) => {
                if (value.cart.length > 0) {
                  let countTotalItems = value.cart.reduce(function (a, b) {
                    return a + b["count"];
                  }, 0);
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
  );
}
// }
