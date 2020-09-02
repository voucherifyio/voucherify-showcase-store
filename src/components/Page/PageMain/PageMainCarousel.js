import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const PageMainCarousel = ({ campaigns }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
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
            <div className="carousel-caption-block">
              <h3>{campaign.name}</h3>
              <p>Description</p>
              <Button variant="dark" className="mx-auto">
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
  campaigns: PropTypes.object,
};

export default connect(mapStateToProps)(PageMainCarousel);
