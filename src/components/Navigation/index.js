import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  removeCurrentCustomer,
  setEnableSidebar,
  setDisableSidebar,
} from '../../redux/actions/userActions';

const StyledBadge = withStyles(() => ({
  badge: {
    backgroundColor: 'yellow',
    color: 'black',
  },
}))(Badge);

const Navigation = ({
  itemsTotalCount,
  currentCustomer,
  dispatch,
  enableSidebar,
}) => {
  const [toggle, setToggle] = useState(enableSidebar);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (toggle) {
      dispatch(setEnableSidebar());
    } else {
      dispatch(setDisableSidebar());
    }
  }, [dispatch, toggle]);
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
            <Link
              className="d-flex align-content-center nav-item-link"
              to="/store"
            >
              <Nav.Item className="navbar-account px-2">Store</Nav.Item>
            </Link>

            {currentCustomer !== null && (
              <>
                <Link
                  className="d-flex align-content-center nav-item-link"
                  to="/"
                  onClick={() => {
                    dispatch(setDisableSidebar());
                    dispatch(removeCurrentCustomer(null));
                  }}
                >
                  <Nav.Item className="navbar-account px-2">Logout</Nav.Item>
                </Link>

                <Nav.Item className="navbar-account px-2">
                  <AccountCircleIcon className="navbar-icon mx-2" />
                  Hi, <b>{currentCustomer.name.split(' ')[0]}</b>
                </Nav.Item>
              </>
            )}
            <Nav.Item className="px-2">
              <Link to="/cart">
                <IconButton className="mx-2">
                  <StyledBadge badgeContent={itemsTotalCount}>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Nav.Item>

            <Nav.Item className="px-2">
              <IconButton
                className={enableSidebar ? 'mx-2 icon-selected' : 'mx-2'}
                onClick={handleToggle}
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

const mapStateToProps = (state) => {
  return {
    enableSidebar: state.userReducer.enableSidebar,
    currentCustomer: state.userReducer.currentCustomer,
    itemsTotalCount: state.cartReducer.itemsTotalCount,
  };
};

export default connect(mapStateToProps)(Navigation);

Navigation.propTypes = {
  enableSidebar: PropTypes.bool,
  storeSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  itemsTotalCount: PropTypes.number.isRequired,
  currentCustomer: PropTypes.object,
  dispatch: PropTypes.func,
};
