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
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

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
        <section className="discountModal">
          <div className="modalContent centeredContent">
            <div className="closeModal">
              <IconButton onClick={handleToggleModal}>
                <CloseIcon />
              </IconButton>
            </div>
            <h4 className="">{modalData.name}</h4>

            {/* We need to filter out certain campaing to show off our distribution mechanism */}

            {!isEmpty(modalData.coupons) &&
              modalData.name !== 'Join our newsletter and get 5% discount' && (
                <div className="pageTitle discountModalButtonWrapper">
                  <VoucherifyButton
                    code={
                      modalData.coupons.find(
                        (coupon) =>
                          coupon.currentCustomer === currentCustomer.source_id
                      ).customerDataCoupon
                    }
                  />
                  <Tooltip title="Apply this code at the checkout!">
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}

            {modalData.name === 'Join our newsletter and get 5% discount' && (
              <DiscountModalPromotionForm campaign={modalData} />
            )}

            {modalData.campaign_type === 'PROMOTION' && (
              <div className="discountModalButtonWrapper">
                <VoucherifyButton
                  onClickFunction={handleDiscounts}
                  text={
                    currentCartDiscount === modalData.name
                      ? 'Opt out'
                      : 'Take part'
                  }
                />
                <Tooltip title="If you follow the tier redemption rules, the discount will be applied automatically. You won't be able to redeem other coupons.">
                  <IconButton>
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {modalData.metadata.redemption_steps && (
              <div className="discountModalRedemptionSteps">
                <p>Redemption rules:</p>
                {modalData.metadata.redemption_steps.split(';').map((step) => (
                  <DiscountModalSteps key={step} step={step} />
                ))}
              </div>
            )}
            {modalData.tiers && (
              <>
                {_orderBy(modalData.tiers, ['metadata.order'], ['desc']).map(
                  (tier, index) => {
                    return (
                      <DiscountModalTiers
                        key={tier}
                        tier={tier}
                        index={index}
                      />
                    );
                  }
                )}
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
