import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../redux/utils';
import Spinner from 'react-bootstrap/Spinner';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentCustomer } from '../../redux/actions/userActions';

const VoucherifyButton = withStyles(() => ({
  root: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: '0.875rem',
    backgroundColor: '#ff8b5c',
    borderRadius: '20em',
    padding: '5px 20px',
    marginTop: '15px',
    marginBottom: '15px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ff8b5c',
    },
  },
}))(Button);

const SelectCustomerModal = ({
  show,
  availableCustomers,
  fetchingCustomers,
  dispatch,
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
              <>
                <div className="d-flex flex-column flex-basis-100 p-5 customer-card">
                  <div className="mx-auto">
                    <img
                      alt="temporary avatar"
                      src={customer.metadata.customerAvatar}
                      width={100}
                    ></img>
                  </div>
                  <div className="d-flex my-3 flex-column align-items-center justify-content-center">
                    <h2 className="customerModal-customerTitle">
                      {customer.metadata.customerTitle}
                    </h2>
                    <p className="customerModal-customerDescription">
                      {customer.metadata.customerDescription}
                    </p>
                  </div>

                  <VoucherifyButton
                    className="mx-auto"
                    style={{
                      marginTop: 'auto',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                    }}
                    onClick={() => {
                      dispatch(getCurrentCustomer(customer.source_id));
                    }}
                  >
                    Login
                  </VoucherifyButton>
                </div>
              </>
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
