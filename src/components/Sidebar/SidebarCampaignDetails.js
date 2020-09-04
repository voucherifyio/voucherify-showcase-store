import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';
import { isEmpty } from '../../redux/utils';
import _orderBy from 'lodash.orderby';
import VoucherifyCodeButton from '../Shared/VoucherifyCodeButton';

const SidebarCampaignDetails = ({ campaign, code = 'noCode' }) => {
  return (
    <div
      style={{
        width: '100%',
        'transition:': 'all .5s ease-in-out',
      }}
      key={campaign.name}
    >
      <div key={campaign.name}>
        {!isEmpty(campaign.voucher) && (
          <>
            <p className="campaign-description section-heading">
              Your discount voucher{' '}
              {campaign.voucher.discount.type === 'PERCENT' && (
                <>{campaign.voucher.discount.percent_off}% off</>
              )}
              {campaign.voucher.discount.type === 'AMOUNT' && (
                <>
                  ${(campaign.voucher.discount.amount_off / 100).toFixed(2)} off
                </>
              )}
              {campaign.metadata.demostoreBOGO &&
                ` for ${campaign.metadata.demostoreBOGO}`}
            </p>
          </>
        )}
        {code !== 'noCode' && (
          <>
            <p className="campaign-description">Click to copy</p>
            <div className="d-flex justify-content-center">
              <VoucherifyCodeButton code={code} />
            </div>
          </>
        )}
        {campaign.metadata.demostoreSteps && (
          <>
            <p className="campaign-description section-heading redemption-rules">
              Redemption rules
            </p>
            {campaign.metadata.demostoreSteps.split(';').map((step) => (
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
        {campaign.tiers && (
          <>
            {_orderBy(
              campaign.tiers,
              ['metadata.demostoreOrder'],
              ['desc']
            ).map((tier, index) => {
              return (
                <>
                  <div key={tier.metadata.demostoreTierName}>
                    <p className="campaign-description section-heading redemption-rules mt-2">
                      Tier {index + 1}
                    </p>
                    <div className="campaign-step d-flex flex-row">
                      <div className="campaign-step-icon">
                        <ArrowRightIcon />
                      </div>
                      <div className="campaign-step-description">
                        <p className="campaign-step-text">
                          Discount:{' '}
                          {tier.action.discount.type === 'PERCENT' && (
                            <>{tier.action.discount.percent_off}%</>
                          )}
                          {tier.action.discount.type === 'AMOUNT' && (
                            <>
                              $
                              {(tier.action.discount.amount_off / 100).toFixed(
                                2
                              )}{' '}
                            </>
                          )}
                          {tier.metadata.demostoreBOGO &&
                            ` for ${tier.metadata.demostoreBOGO}`}
                        </p>
                      </div>
                    </div>
                    {tier.metadata.demostoreSteps.split(';').map((step) => (
                      <div key={step} className="campaign-step d-flex flex-row">
                        <div className="campaign-step-icon">
                          <ArrowRightIcon />
                        </div>
                        <div className="campaign-step-description">
                          <p className="campaign-step-text">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarCampaignDetails;

SidebarCampaignDetails.propTypes = {
  campaign: PropTypes.object.isRequired,
  code: PropTypes.string,
};
