import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  removeCurrentCustomer,
  setEnableSidebar,
} from '../../redux/actions/userActions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getCurrentCustomer } from '../../redux/actions/userActions';
const StyledBadge = withStyles(() => ({
  badge: {
    backgroundColor: 'yellow',
    color: 'black',
  },
}))(Badge);

const NavigationMenu = ({
  itemsTotalCount,
  currentCustomer,
  availableCustomers,
  dispatch,
}) => {
  const handleLogOut = () => {
    dispatch(setEnableSidebar(false));
    dispatch(removeCurrentCustomer(null));
  };

  const handleSwitchCustomer = (customer) => {
    dispatch(setEnableSidebar(false));
    dispatch(getCurrentCustomer(customer.source_id));
  };

  return (
    <Col className="navigationMenu">
      <Tooltip title="Go to store">
        <Link className="navigationMenuItemLink" to="/">
          Store
        </Link>
      </Tooltip>
      <NavDropdown
        className="navigationMenuUser"
        title={
          <div>
            <AccountCircleIcon className="navigationMenuUserAvatar" />
            Hi, <b>{currentCustomer.metadata.firstName}</b>
          </div>
        }
      >
        {availableCustomers
          .filter((customer) => customer.id !== currentCustomer.id)
          .map((cust) => (
            <NavDropdown.Item
              onClick={() => handleSwitchCustomer(cust)}
              key={cust.id}
              className="navigationMenuUserDropdownItem"
            >
              <div className="customerNavigationTitle">
                {cust.metadata.title}
              </div>
              <div className="customerNavigationDescription">
                {cust.metadata.description}
              </div>
            </NavDropdown.Item>
          ))}
      </NavDropdown>
      <Tooltip title="Go to store">
        <Link to="/cart">
          <IconButton className="navigationMenuIcon">
            <StyledBadge badgeContent={itemsTotalCount}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Log out">
        <IconButton className="navigationMenuIcon" onClick={handleLogOut}>
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    enableSidebar: state.userReducer.enableSidebar,
    currentCustomer: state.userReducer.currentCustomer,
    itemsTotalCount: state.cartReducer.itemsTotalCount,
    availableCustomers: state.userReducer.availableCustomers,
  };
};

export default connect(mapStateToProps)(NavigationMenu);

NavigationMenu.propTypes = {
  enableSidebar: PropTypes.bool,
  storeSidebar: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  itemsTotalCount: PropTypes.number,
  currentCustomer: PropTypes.object,
  dispatch: PropTypes.func,
  availableCustomers: PropTypes.array,
};
