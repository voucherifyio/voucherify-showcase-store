import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import VoucherifyButton from '../../App/VoucherifyButton';
import VoucherifyLogoSquare from '../../../assets/VoucherifyLogoSquare.png';
import _isEmpty from 'lodash.isempty';
import DiscountCarouselSignUpModal from './DiscountCarouselSignUpModal';

const DiscountCarouselBanner = ({
  campaign,
  currentCustomer,
  currentCartDiscount,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const couponForCurrentCustomer = campaign.coupons.find(
    (coupon) => coupon.currentCustomer === currentCustomer.source_id
  );

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
          <div
            className="carouselBannerDescription"
            dangerouslySetInnerHTML={{ __html: campaign.metadata.description }}
          ></div>

          {campaign.campaign_type === 'PROMOTION' &&
            campaign.name !== currentCartDiscount && (
              <div className="carouselBannerDescriptionPromotion">
                <div>
                  <img src={VoucherifyLogoSquare} alt="" width="24px" />
                </div>
                <div className="carouselBannerDescriptionPromotionText">
                  Enable this promotion in the sidebar
                </div>
              </div>
            )}
          {!_isEmpty(couponForCurrentCustomer) && (
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
          {_isEmpty(couponForCurrentCustomer) &&
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
    products: state.storeReducer.products,
  };
};

DiscountCarouselBanner.propTypes = {
  campaign: PropTypes.object,
  currentCustomer: PropTypes.object,
  currentCartDiscount: PropTypes.string,
  products: PropTypes.array,
};

export default connect(mapStateToProps)(DiscountCarouselBanner);
