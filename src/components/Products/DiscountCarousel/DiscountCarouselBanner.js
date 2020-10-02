import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import VoucherifyButton from '../../App/VoucherifyButton';
import { isEmpty } from '../../../redux/utils';
import DiscountCarouselSignUpModal from './DiscountCarouselSignUpModal';

const DiscountCarouselBanner = ({ campaign, currentCustomer }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div
        className={
          campaign.metadata.img_url
            ? 'carouselBanner carouselBannerFullWidth'
            : 'carouselBanner'
        }
      >
        <div
          className={
            campaign.metadata.img_url
              ? 'carouselBannerText carouselBannerTextHalfWidth'
              : 'carouselBannerText'
          }
        >
          <h3 className="carouselBannerTitle">{campaign.name}</h3>
          <p className="carouselBannerDescription">
            {campaign.metadata.description}
          </p>
          {campaign.campaign_type === 'PROMOTION' && (
            <p className="carouselBannerDescriptionPromotion">
              You can enable this promotion in the sidebar
            </p>
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
          {isEmpty(campaign.coupons) &&
            campaign.name === 'Join our newsletter and get 5% discount' && (
              <VoucherifyButton
                onClickFunction={() => setModalShow(true)}
                text="Sign up"
              />
            )}
        </div>
        {campaign.metadata.img_url && (
          <div className="carouselBannerImage">
            <img
              className="carouselBannerImageImg"
              src={campaign.metadata.img_url}
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
  currentCustomer: PropTypes.object,
};

export default connect(mapStateToProps)(DiscountCarouselBanner);
