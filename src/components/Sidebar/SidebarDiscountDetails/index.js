import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';
import { isEmpty } from '../../../redux/utils';
import _orderBy from 'lodash.orderby';
import VoucherifyButton from '../../App/VoucherifyButton';
import SidebarDiscountDetailsTier from './SidebarDiscountDetailsTier';
import './style.css';

const SidebarDiscountDetails = ({ campaign, code = 'cartDiscount' }) => {
  let discountText = '';
  let discountProduct = '';
  // if this is a Voucher
  if (!isEmpty(campaign.code)) {
    if (campaign.discount.type === 'PERCENT') {
      discountText = `${campaign.discount.percent_off}% off`;
    } else if (campaign.discount.type === 'AMOUNT') {
      discountText = `$${(campaign.discount.amount_off / 100).toFixed(2)} off`;
    }

    if (!isEmpty(campaign.metadata.discount_suffix)) {
      discountProduct = ` for ${campaign.metadata.discount_suffix}`;
    }
  }

  // if this is a Campaign
  if (!isEmpty(campaign.voucher)) {
    if (campaign.voucher.discount.type === 'PERCENT') {
      discountText = `${campaign.voucher.discount.percent_off}% off`;
    } else if (campaign.voucher.discount.type === 'AMOUNT') {
      discountText = `$${(campaign.voucher.discount.amount_off / 100).toFixed(
        2
      )} off`;
    }

    if (!isEmpty(campaign.metadata.discount_suffix)) {
      discountProduct = ` for ${campaign.metadata.discount_suffix}`;
    }
  }

  return (
    <div className="sidebarAccordion" key={campaign.name}>
      <div key={campaign.name}>
        {code !== 'cartDiscount' && (
          <p className="discountDescription">
            Discount{' '}
            <span className="discountDescriptionAmount">{discountText}</span>
            {discountProduct}
          </p>
        )}

        {/* We're checking if the Campaign has a voucher code */}
        {code !== 'cartDiscount' && <VoucherifyButton code={code} />}
        <p className="campaignDescription">{campaign.metadata.description}</p>
        {campaign.metadata.redemption_steps && (
          <div>
            <p className="redemptionRules">Redemption rules</p>
            <div className="redemptionRulesWrapper">
              {campaign.metadata.redemption_steps.split(';').map((step) => (
                <div key={step} className="redemptionRulesStep">
                  <ArrowRightIcon />
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {campaign.code && (
          <>
            {!isEmpty(campaign.discount.amount_limit) && (
              <p className="statistics">
                Discount limit{' '}
                <span className="redemptionAmount">
                  ${(campaign.discount.amount_limit / 100).toFixed(2, 10)}
                </span>
              </p>
            )}
            <p className="statistics">
              Total redemptions{' '}
              <span className="redemptionAmount">
                {campaign.redemption.redeemed_quantity}
              </span>
            </p>
          </>
        )}
        {campaign.tiers && (
          <>
            {_orderBy(campaign.tiers, ['metadata.order'], ['desc']).map(
              (tier, index) => (
                <SidebarDiscountDetailsTier
                  key={index}
                  tier={tier}
                  index={index}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarDiscountDetails;

SidebarDiscountDetails.propTypes = {
  campaign: PropTypes.object.isRequired,
  code: PropTypes.string,
};
