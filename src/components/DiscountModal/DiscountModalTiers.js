import React from 'react';
import PropTypes from 'prop-types';

const DiscountModalTiers = ({ tier, index }) => {
  return (
    <div key={tier.metadata.demostoreTierName}>
      <p className="campaign-description section-heading redemption-rules mt-2">
        Tier {index + 1}
      </p>
      <div className="campaign-step d-flex flex-row">
        <div className="campaign-step-description">
          <p className="campaign-step-text">
            Discount:{' '}
            {tier.action.discount.type === 'PERCENT' && (
              <>{tier.action.discount.percent_off}%</>
            )}
            {tier.action.discount.type === 'AMOUNT' && (
              <>${(tier.action.discount.amount_off / 100).toFixed(2)} </>
            )}
            {tier.metadata.demostoreBOGO &&
              ` for ${tier.metadata.demostoreBOGO}`}
          </p>
        </div>
      </div>
      {tier.metadata.demostoreSteps.split(';').map((step) => (
        <div key={step} className="campaign-step d-flex flex-row">
          <div className="campaign-step-description">
            <p className="campaign-step-text">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountModalTiers;

DiscountModalTiers.propTypes = {
  tier: PropTypes.object,
  index: PropTypes.number,
};
