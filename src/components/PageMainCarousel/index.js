import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const PageMainCarousel = ({
  campaigns,
  handleToggleModal,
  handleModalData,
}) => {
  return (
    <Carousel controls={false}>
      {campaigns.map((campaign, i) => (
        <Carousel.Item
          key={i}
          id={`carousel-${i}`}
          className="carousel"
          style={{
            backgroundImage: `url('.../../../assets/images/carousel/coffee-${i}.jpg')`,
          }}
        >
          <Carousel.Caption
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              bottom: 'initial',
            }}
          >
            <div className="carousel-caption-block my-auto">
              <h3>{campaign.name}</h3>
              <Button
                variant="dark"
                className="mx-auto"
                onClick={() => {
                  handleToggleModal();
                  handleModalData(campaign);
                }}
              >
                Get coupon
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const mapStateToProps = (state) => {
  return {
    campaigns: state.userReducer.campaigns,
  };
};

PageMainCarousel.propTypes = {
  campaigns: PropTypes.array,
};

export default connect(mapStateToProps)(PageMainCarousel);
