import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateCurrentCustomerEmail,
  publishCampaign,
  getCampaigns,
} from '../../redux/actions/userActions';
const DiscountModalPromotionForm = ({
  campaign,
  dispatch,
  currentCustomer,
}) => {
  const [email, setEmail] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const asyncDispatch = async () => {
    await dispatch(updateCurrentCustomerEmail(email));
    await dispatch(publishCampaign(campaign));
    await dispatch(getCampaigns());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    asyncDispatch();
  };
  return (
    <>
      <div>
        <p>Subscribe to our newsletter to get extra 5% discount!</p>
        {currentCustomer.email ? (
          <p>You are already subscribed</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input onChange={handleChange} type="email" name="email" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
  };
};

export default connect(mapStateToProps)(DiscountModalPromotionForm);
