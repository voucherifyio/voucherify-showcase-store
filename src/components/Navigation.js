import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "./Context";
import { CustomerConsumer } from "./CustomerContext";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const StyledBadge = withStyles(() => ({
  badge: {
    backgroundColor: "yellow",
    color: "black",
  },
}))(Badge);

const Navigation = ({ handleSidebar, sidebar }) => {
  return (
    <>
      <Navbar className="m-auto navbar-sticky" collapseOnSelect expand="lg">
        <Link to="/">
          <Navbar.Brand className="m-auto">
            <img src="/logo.svg" width="150" alt="Hot Beans" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
          <Link className="d-flex align-content-center nav-item-link" to="/store">
              <Nav.Item className="navbar-account px-2">Store</Nav.Item>
            </Link>
            <CustomerConsumer>
              {(ctx) => {
                if (ctx.customer !== null) {
                  const firstName = ctx.customer.name.split(" ")[0];
                  return (
                    <>
                      <Nav.Item className="navbar-account px-2">
                        <AccountCircleIcon className="navbar-icon mx-2" />
                        Hi, <b>{firstName}</b>
                      </Nav.Item>
                    </>
                  );
                }
              }}
            </CustomerConsumer>
            <ProductConsumer>
              {(ctx) => {
                const countTotalItems = ctx.cart.reduce(
                  (acc, curr) => acc + curr.count,
                  0
                );

                return (
                  <>
                    <Nav.Item className="px-2">
                      <Link to="/cart">
                        <IconButton className="mx-2">
                          <StyledBadge badgeContent={countTotalItems}>
                            <ShoppingCartIcon />
                          </StyledBadge>
                        </IconButton>
                      </Link>
                      <b>${(ctx.cartTotalAfterPromotion / 100).toFixed(2)}</b>
                    </Nav.Item>
                  </>
                );
              }}
            </ProductConsumer>
            <Nav.Item className="px-2">
              <IconButton
                className={sidebar ? "mx-2 icon-selected" : "mx-2"}
                onClick={handleSidebar}
              >
                <SettingsIcon />
              </IconButton>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
