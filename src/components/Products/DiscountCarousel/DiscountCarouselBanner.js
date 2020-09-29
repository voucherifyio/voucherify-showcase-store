import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {
  setEnableCartDiscounts,
  setCurrentCartDiscount,
} from '../../../redux/actions/userActions';
import VoucherifyButton from '../../Shared/VoucherifyButton';
import { isEmpty } from '../../../redux/utils';
import DiscountCarouselSignUpModal from './DiscountCarouselSignUpModal';

const DiscountCarouselBanner = ({
  campaign,
  dispatch,
  currentCustomer,
  currentCartDiscount,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const handleDiscounts = () => {
    if (currentCartDiscount !== campaign.name) {
      dispatch(setEnableCartDiscounts(true));
      dispatch(setCurrentCartDiscount(campaign.name));
    } else {
      dispatch(setEnableCartDiscounts(false));
      dispatch(setCurrentCartDiscount(null));
    }
  };

  return (
    <>
      <div
        className={
          campaign.metadata.carousel_banner_url
            ? 'carouselBanner carouselBannerFullWidth'
            : 'carouselBanner'
        }
      >
        <div
          className={
            campaign.metadata.carousel_banner_url
              ? 'carouselBannerText carouselBannerTextHalfWidth'
              : 'carouselBannerText'
          }
        >
          <h3 className="carouselBannerTitle">{campaign.name}</h3>
          <p className="carouselBannerDescription">
            {campaign.metadata.description}
          </p>
          {campaign.campaign_type === 'PROMOTION' && (
            <VoucherifyButton
              onClickFunction={handleDiscounts}
              text={
                currentCartDiscount === campaign.name ? 'Disable' : 'Enable'
              }
            />
          )}
          {!isEmpty(campaign.coupons) && (
            <VoucherifyButton
              text="Get code"
              code={
                campaign.coupons.find(
                  (coupon) =>
                    coupon.currentCustomer === currentCustomer.source_id
                ).customerDataCoupon
              }
            />
          )}
          {campaign.name === 'Join our newsletter and get 5% discount' && (
            <VoucherifyButton
              onClickFunction={() => setModalShow(true)}
              text="Sign up"
            />
          )}
        </div>
        {campaign.metadata.carousel_banner_url && (
          <div className="carouselBannerImage">
            <img
              className="carouselBannerImageImg"
              src={campaign.metadata.carousel_banner_url}
              alt=""
            />
          </div>
        )}
      </div>
      <DiscountCarouselSignUpModal
        campaign={campaign}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentCartDiscount: state.userReducer.currentCartDiscount,
    currentCustomer: state.userReducer.currentCustomer,
  };
};

DiscountCarouselBanner.propTypes = {
  campaign: PropTypes.object,
};

export default connect(mapStateToProps)(DiscountCarouselBanner);
