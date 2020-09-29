import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  updateCurrentCustomerEmail,
  publishCampaign,
  getCampaigns,
} from '../../../../redux/actions/userActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const DiscountCarouselSignUpModalForm = ({
  campaign,
  dispatch,
  currentCustomer,
  onHide,
}) => {
  const [email, setEmail] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const asyncDispatch = async () => {
    await dispatch(updateCurrentCustomerEmail(email));
    await dispatch(publishCampaign(campaign));
    await dispatch(getCampaigns());
    onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    asyncDispatch();
  };
  return (
    <>
      {currentCustomer.email ? (
        <p className="signUpModalFormResult">Thank you for subscribing!</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              This is fake shop - you will not recieve any email
            </Form.Text>
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
  };
};

DiscountCarouselSignUpModalForm.propTypes = {
  campaign: PropTypes.object,
  dispatch: PropTypes.func,
  currentCustomer: PropTypes.object,
  onHide: PropTypes.func,
};

export default connect(mapStateToProps)(DiscountCarouselSignUpModalForm);
