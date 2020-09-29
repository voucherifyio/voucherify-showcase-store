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
              Log in to our demo shop where you can experience twelve
              promotional workflows. In the control panel on your right, you
              will see available promotions retrieved from Voucherify. You can
              also switch between customer personas.
            </p>
            <div className="customersModalArrowLink">
              <img className="customersModalArrow" alt="" src={ArrowIcon} />
              <div className="customersModalLink">
                Connect your Voucherify acccount to Hot Beans
              </div>
            </div>
          </div>
          <div className="customersModalCustomers">
            {availableCustomers.map((customer) => (
              <CustomersModalCustomer key={customer.name} customer={customer} />
            ))}
          </div>
          <div className="customersModalFooter">
            <div>
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
              <a href="https://rspective.com">rspective</a>
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
  availableCustomers: PropTypes.object,
  fetchingCustomers: PropTypes.bool,
  campaigns: PropTypes.object,
};
