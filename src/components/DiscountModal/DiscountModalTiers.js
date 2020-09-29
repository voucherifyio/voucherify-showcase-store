import React from 'react';
import PropTypes from 'prop-types';

const DiscountModalTiers = ({ tier, index }) => {
  return (
    <div key={tier.name} className="discountModalTier">
      <p className="tierName">Tier {index + 1}</p>
      <p>
        <span className="tierDiscount">Discount:</span>{' '}
        {tier.action.discount.type === 'PERCENT' && (
          <>{tier.action.discount.percent_off}%</>
        )}
        {tier.action.discount.type === 'AMOUNT' && (
          <>${(tier.action.discount.amount_off / 100).toFixed(2)} </>
        )}
        {tier.metadata.promotion_product &&
          ` for ${tier.metadata.promotion_product}`}
      </p>
      <p>Redemption rules</p>
      <ul>
        {tier.metadata.redemption_steps.split(';').map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountModalTiers;

DiscountModalTiers.propTypes = {
  tier: PropTypes.object,
  index: PropTypes.number,
};
