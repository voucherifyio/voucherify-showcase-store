import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import Spinner from 'react-bootstrap/Spinner';
import SelectCustomerModalCustomer from './SelectCustomerModalCustomer';
import PropTypes from 'prop-types';

const SelectCustomerModal = ({
  show,
  availableCustomers,
  fetchingCustomers,
  campaigns,
}) => {
  const showHideClassName = show ? 'modal d-flex' : 'modal d-none';

  return (
    <div className={showHideClassName}>
      {isEmpty(availableCustomers) ||
      fetchingCustomers ||
      isEmpty(campaigns) ? (
        <div className="d-flex m-auto justify-content-center align-items-center">
          <Spinner animation="grow" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <section className="modal-main">
          <div className="d-flex mt-3 mb-5 flex-column align-items-center justify-content-center">
            <h1 className="customerModal-modalTitle">
              Welcome to Voucherify Store Showcase
            </h1>
            <p className="customerModal-modalDescription">
              Login to our demo shop, Hot beans, it is not a real shop, but you
              can experience 12 promotions workflows in details to understand
              how they work. In control panel on the right after you login,is
              possible to highlight promotion, see some of their statistics
              which are retrieved from Voucherify. You can also switch between
              our customers personas.
            </p>
          </div>
          <div className="d-flex flex-row justify-content-around">
            {availableCustomers.map((customer) => (
              <SelectCustomerModalCustomer
                key={customer.name}
                customer={customer}
              />
            ))}
          </div>
        </section>
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

export default connect(mapStateToProps)(SelectCustomerModal);

SelectCustomerModal.propTypes = {
  show: PropTypes.bool,
  availableCustomers: PropTypes.object,
  fetchingCustomers: PropTypes.bool,
  campaigns: PropTypes.object,
};
