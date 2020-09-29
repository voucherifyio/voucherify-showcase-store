import React from 'react';
import PropTypes from 'prop-types';

const DiscountModalSteps = ({ step }) => {
  return (
    <div key={step}>
      <div>
        <p>{step}</p>
      </div>
    </div>
  );
};

export default DiscountModalSteps;

DiscountModalSteps.propTypes = {
  step: PropTypes.string,
};
