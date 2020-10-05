import React from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import ArrowLine from '../../assets/ArrowLine.png';
import CustomersModalCustomer from './CustomersModalCustomer';
import './style.css';
import VoucherifyLogo from '../../assets/VoucherifyLogo.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

const CustomersModal = ({
  availableCustomers,
  fetchingCustomers,
  campaigns,
}) => {
  return (
    <div className="customersModalWrapper">
      {_isEmpty(availableCustomers) ||
      fetchingCustomers ||
      _isEmpty(campaigns) ? (
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="customersModal">
          <img className="customersModalArrowLine" alt="" src={ArrowLine} />
          <div className="customersModalDescWrapper">
            <h1 className="customersModalTitle">
              Welcome to Hot Beans — Voucherify demo store
            </h1>
            <p className="customersModalDesc">
              Log in to explore various promotional workflows we have predefined
              in Voucherify dashboard. You can enable and disable active
              promotions in the control panel on your right.{' '}
              <span className="customersModalDescBold">
                Remember to switch between customers to learn how promotion
                personalization works!
              </span>
            </p>
          </div>
          <div className="customersModalCustomers">
            {availableCustomers.map((customer) => (
              <CustomersModalCustomer key={customer.name} customer={customer} />
            ))}
          </div>
          <div className="customersModalSourceLinks">
            <span className="sourceLinkText">Connect to Voucherify</span>
            <a href="https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2F&template=https%3A%2F%2Fgithub.com%2Fvoucherifyio%2Fvoucherify-showcase-store%2F">
              <img
                src="https://www.herokucdn.com/deploy/button.svg"
                alt="Deploy"
              />
            </a>
            <span className="sourceLinkText">Source code</span>
            <a href="https://github.com/voucherifyio/voucherify-showcase-store">
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </a>
          </div>

          <div className="customersModalFooter">
            <div className="voucherifyLogoWrapper">
              <a href="https://voucherify.io">
                <img
                  className="voucherifyLogo"
                  alt="Voucherify logo"
                  src={VoucherifyLogo}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    availableCustomers: state.userReducer.availableCustomers,
    fetchingCustomers: state.userReducer.fetchingCustomers,
    campaigns: state.userReducer.campaigns,
  };
};

export default connect(mapStateToProps)(CustomersModal);

CustomersModal.propTypes = {
  availableCustomers: PropTypes.array,
  fetchingCustomers: PropTypes.bool,
  campaigns: PropTypes.array,
};
