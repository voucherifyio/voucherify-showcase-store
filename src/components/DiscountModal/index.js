import React from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import isEmpty from '../../redux/utils';
import _orderBy from 'lodash.orderby';
import {
  setEnableCartDiscounts,
  setCurrentCartDiscount,
} from '../../redux/actions/userActions';
import VoucherifyButton from '../Shared/VoucherifyButton';

const DiscountModal = ({
  toggleModal,
  handleToggleModal,
  modalData,
  currentCustomer,
  dispatch,
  enableCartDiscounts,
  currentCartDiscount,
}) => {
  //

  const handleEnable = (campaignName) => {
    dispatch(setEnableCartDiscounts(true));
    dispatch(setCurrentCartDiscount(campaignName));
  };

  const handleDisable = () => {
    dispatch(setEnableCartDiscounts(false));
    dispatch(setCurrentCartDiscount());
  };

  const showHideClassName = toggleModal ? 'modal d-flex' : 'modal d-none';

  return (
    <div className={showHideClassName}>
      {!isEmpty(modalData) && (
        <section className="modal-main discountModal">
          <div className="d-flex mt-3 mb-3 flex-column align-items-center justify-content-center position-relative">
            <div className="close">
              <IconButton onClick={handleToggleModal}>
                <CloseIcon />
              </IconButton>
            </div>

            <h1 className="customerModal-modalTitle">{modalData.name}</h1>
            {!isEmpty(modalData.coupons) ? (
              <>
                <p className="customerModal-modalDescription">
                  Your discount code is:
                </p>
                <VoucherifyButton
                  code={
                    modalData.coupons.find(
                      (coupon) =>
                        coupon.currentCustomer === currentCustomer.source_id
                    ).customerDataCoupon
                  }
                />
              </>
            ) : (
              <VoucherifyButton
                onClick={() => {
                  currentCartDiscount === modalData.name
                    ? handleDisable()
                    : handleEnable(modalData.name);
                }}
                text={
                  currentCartDiscount === modalData.name ? 'Disable' : 'Enable'
                }
              />
            )}

            {modalData.metadata.demostoreSteps && (
              <>
                <p className="campaign-description section-heading redemption-rules">
                  To reedem this code you must fulfill this redemption rules:
                </p>
                {modalData.metadata.demostoreSteps.split(';').map((step) => (
                  <div key={step} className="campaign-step d-flex flex-row">
                    <div className="campaign-step-description">
                      <p className="campaign-step-text">{step}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            {modalData.tiers && (
              <>
                {_orderBy(
                  modalData.tiers,
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
                          <div className="campaign-step-description">
                            <p className="campaign-step-text">
                              Discount:{' '}
                              {tier.action.discount.type === 'PERCENT' && (
                                <>{tier.action.discount.percent_off}%</>
                              )}
                              {tier.action.discount.type === 'AMOUNT' && (
                                <>
                                  $
                                  {(
                                    tier.action.discount.amount_off / 100
                                  ).toFixed(2)}{' '}
                                </>
                              )}
                              {tier.metadata.demostoreBOGO &&
                                ` for ${tier.metadata.demostoreBOGO}`}
                            </p>
                          </div>
                        </div>
                        {tier.metadata.demostoreSteps.split(';').map((step) => (
                          <div
                            key={step}
                            className="campaign-step d-flex flex-row"
                          >
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
        </section>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCustomer: state.userReducer.currentCustomer,
    fetchingCustomers: state.userReducer.fetchingCustomers,
    campaigns: state.userReducer.campaigns,
    enableCartDiscounts: state.userReducer.enableCartDiscounts,
    currentCartDiscount: state.userReducer.currentCartDiscount,
  };
};

export default connect(mapStateToProps)(DiscountModal);
