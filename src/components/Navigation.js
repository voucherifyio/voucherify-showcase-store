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
      <Navbar className='m-auto navbar-sticky' collapseOnSelect expand="lg">
        <Navbar.Brand className="m-auto" href="/store/all">
          <img src="/logo.svg" width="150" alt="React Bootstrap logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <CustomerConsumer>
              {(ctx) => {
                if (ctx.customer !== null) {
                  const firstName = ctx.customer.name.split(" ")[0];
                  return (
                    <>
                      <Nav.Item>
                        <IconButton>
                          <AccountCircleIcon />
                        </IconButton>
                        Hello, <b>{firstName}</b>
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
                    <Nav.Item>
                      <Link to="/cart">
                        <IconButton>
                          <StyledBadge badgeContent={countTotalItems}>
                            <ShoppingCartIcon />
                          </StyledBadge>
                        </IconButton>
                      </Link>
                      <b>${ctx.cartTotalAfterPromotion.toFixed(2)}</b>
                    </Nav.Item>
                  </>
                );
              }}
            </ProductConsumer>
            <Nav.Item>
              <IconButton
                className={sidebar ? "icon-selected" : ""}
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
