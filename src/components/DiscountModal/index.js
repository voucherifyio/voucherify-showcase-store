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
import DiscountModalTiers from './DiscountModalTiers';
import DiscountModalSteps from './DiscountModalSteps';
import PropTypes from 'prop-types';
import DiscountModalPromotionForm from './DiscountModalPromotionForm';
const DiscountModal = ({
  toggleModal,
  handleToggleModal,
  modalData,
  currentCustomer,
  dispatch,
  currentCartDiscount,
}) => {
  const handleDiscounts = () => {
    if (currentCartDiscount !== modalData.name) {
      dispatch(setEnableCartDiscounts(true));
      dispatch(setCurrentCartDiscount(modalData.name));
    } else {
      dispatch(setEnableCartDiscounts(false));
      dispatch(setCurrentCartDiscount(null));
    }
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

            {/* We need to filter out certain campaing to show off our distribution mechanism */}

            {!isEmpty(modalData.coupons) &&
              modalData.name !== '$5 off for sign up form' && (
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
              )}

            {modalData.name === '$5 off for sign up form' && (
              <DiscountModalPromotionForm campaign={modalData}/>
            )}

            {modalData.campaign_type === 'PROMOTION' && (
              <VoucherifyButton
                onClickFunction={handleDiscounts}
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
                  <DiscountModalSteps key={step} step={step} />
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
                    <DiscountModalTiers key={tier} tier={tier} index={index} />
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
    currentCartDiscount: state.userReducer.currentCartDiscount,
  };
};

export default connect(mapStateToProps)(DiscountModal);

DiscountModal.propTypes = {
  toggleModal: PropTypes.bool,
  handleToggleModal: PropTypes.func,
  modalData: PropTypes.object,
  currentCustomer: PropTypes.object,
  dispatch: PropTypes.func,
  currentCartDiscount: PropTypes.string,
};
