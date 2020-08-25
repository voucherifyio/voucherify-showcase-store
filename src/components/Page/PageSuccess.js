import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { setOrderId } from '../../redux/actions/cartActions';

const PageSuccess = ({ orderId, dispatch }) => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col my-5">
          <div>
            {orderId ? (
              <>
                <h1 className="text-center mt-5 pt-5">Order {orderId} completed</h1>
                <h2 className="text-center mb-5 pb-5">Thank you for your order!</h2>
                <Link
                  to="/"
                  onClick={() => dispatch(setOrderId(null))}
                  className="inline-block btn btn-dark"
                >
                  Continue shopping
                </Link>
              </>
            ) : (
              <div className="d-flex my-3 justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderId: state.cartReducer.orderId,
  };
};

export default connect(mapStateToProps)(PageSuccess);

PageSuccess.propTypes = {
  orderId: PropTypes.string,
  dispatch: PropTypes.func,
};
