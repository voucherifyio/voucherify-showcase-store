import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';
import VoucherifyCodeButton from '../Shared/VoucherifyCodeButton';

const SidebarVoucherDetails = ({ voucher, code }) => {
  return (
    <div
      style={{
        width: '100%',
        'transition:': 'all .5s ease-in-out',
      }}
      key={voucher.name}
    >
      <div key={voucher.name}>
        <p className="campaign-description section-heading">
          Your discount voucher{' '}
          {voucher.discount.type === 'PERCENT' && (
            <>{voucher.discount.percent_off}% off</>
          )}
          {voucher.discount.type === 'AMOUNT' && (
            <>${(voucher.discount.amount_off / 100).toFixed(2)} off</>
          )}
        </p>
        <p className="campaign-description">Click to copy</p>
        <div className="d-flex justify-content-center">
          <VoucherifyCodeButton code={code} />
        </div>
        {voucher.discount.amount_limit && (
          <>
            <p className="campaign-description section-heading redemption-rules">
              Voucher information
            </p>
            <div className="campaign-step d-flex flex-row align-items-center">
              <div className="campaign-step-icon">
                <ArrowRightIcon />
              </div>
              <div className="campaign-step-description">
                <p className="campaign-step-text">
                  Discount limit: {voucher.discount.amount_limit / 100}
                </p>
              </div>
            </div>
          </>
        )}
        {voucher.metadata.demostoreSteps && (
          <>
            <p className="campaign-description section-heading redemption-rules">
              Redemption rules
            </p>
            {voucher.metadata.demostoreSteps.split(';').map((step) => (
              <div key={step} className="campaign-step d-flex flex-row">
                <div className="campaign-step-icon">
                  <ArrowRightIcon />
                </div>
                <div className="campaign-step-description">
                  <p className="campaign-step-text">{step}</p>
                </div>
              </div>
            ))}
          </>
        )}
        <p className="campaign-description section-heading redemption-rules mt-4">
          Voucher statistics
        </p>
        <p className="campaign-description redemption-rules my-1">
          Total number of redemptions:{' '}
          <span className="section-heading">
            {voucher.redemption.redeemed_quantity}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SidebarVoucherDetails;

SidebarVoucherDetails.propTypes = {
  voucher: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
};
