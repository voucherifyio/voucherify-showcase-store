import React from 'react';
import PropTypes from 'prop-types';

const DiscountModalSteps = ({step}) => {
  return (
    <div key={step} className="campaign-step d-flex flex-row">
    <div className="campaign-step-description">
      <p className="campaign-step-text">{step}</p>
    </div>
  </div>
  );
};

export default DiscountModalSteps


DiscountModalSteps.propTypes = {
  step: PropTypes.string
};

