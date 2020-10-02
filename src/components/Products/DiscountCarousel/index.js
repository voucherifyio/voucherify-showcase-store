import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import DiscountCarouselBanner from './DiscountCarouselBanner';
import { isEmpty } from '../../../redux/utils';

const DiscountCarousel = ({ campaigns }) => {
  return (
    <div className="carouselWrapper">
      <Carousel interval={5000}>
        {/* We filter out campaigns without banners */}
        {campaigns
          .filter((camp) => !isEmpty(camp.metadata.carousel_banner_img_url))
          .map((campaign, i) => (
            <Carousel.Item
              key={i}
              className="carousel"
              style={{
                background: `url(${campaign.metadata.carousel_banner_img_url}) no-repeat center`,
                backgroundSize: 'cover',
              }}
            >
              <DiscountCarouselBanner campaign={campaign} />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campaigns: state.userReducer.campaigns,
  };
};

DiscountCarousel.propTypes = {
  campaigns: PropTypes.array,
};

export default connect(mapStateToProps)(DiscountCarousel);
