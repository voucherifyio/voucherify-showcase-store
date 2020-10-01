import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import ArrowIcon from '../../assets/ArrowIcon.png';
import ArrowLine from '../../assets/ArrowLine.png';
import CustomersModalCustomer from './CustomersModalCustomer';
import './style.css';
import VoucherifyLogo from '../../assets/VoucherifyLogo.png';

const CustomersModal = ({
  availableCustomers,
  fetchingCustomers,
  campaigns,
}) => {
  return (
    <div className="customersModalWrapper">
      {isEmpty(availableCustomers) ||
      fetchingCustomers ||
      isEmpty(campaigns) ? (
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="customersModal">
          <img className="customersModalArrowLine" alt="" src={ArrowLine} />
          <div className="customersModalDescWrapper">
            <h1 className="customersModalTitle">
              Welcome to Voucherify Store!
            </h1>
            <p className="customersModalDesc">
              Log in to our demo shop where you can experience various
              promotional workflows. In the{' '}
              <span className="customersModalDescBold">control panel</span> on
              your right, you will see available promotions retrieved from
              Voucherify. You can also{' '}
              <span className="customersModalDescBold">
                switch between customers
              </span>{' '}
              to use their own specific coupons.
            </p>
            <a href="https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2F&template=https%3A%2F%2Fgithub.com%2Fvoucherifyio%2Fvoucherify-showcase-store%2F">
              <div className="customersModalArrowLink">
                <img className="customersModalArrow" alt="" src={ArrowIcon} />
                <div className="customersModalLink">
                  Connect your Voucherify acccount to Hot Beans
                </div>
              </div>
            </a>
          </div>
          <div className="customersModalCustomers">
            {availableCustomers.map((customer) => (
              <CustomersModalCustomer key={customer.name} customer={customer} />
            ))}
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
            <div>
              © {new Date().getFullYear()}{' '}
              <a className="voucherifyLink" href="https://rspective.com">
                rspective
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
