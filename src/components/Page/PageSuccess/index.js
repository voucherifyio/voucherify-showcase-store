import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { setOrderId } from '../../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';

const PageSuccess = ({ orderId, dispatch }) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
      dispatch(setOrderId(null));
    }, 3000);
  });

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div className="page">
          {orderId ? (
            <Row>
              <Col>
                <div className="centeredContent">
                  <h1 className="pageTitle">Order {orderId} completed!</h1>
                  <h6>You will be redirected to homepage shortly</h6>
                </div>
              </Col>
            </Row>
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </div>
      )}
    </>
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
