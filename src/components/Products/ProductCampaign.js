import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';

const ProductCampaign = ({ campaign }) => {
  return (
    <Col lg={4} md={6} sm={12} xs={12}>
      <div className="productCard campaignCard">
        <div>
          <img
            className="productCardImage"
            src={campaign.metadata.carousel_banner_url}
            alt={campaign.name}
          />
        </div>

        <div className="productCardContent">
          <h6 className="productCardTitle">{campaign.name}</h6>
          <div className="productCardDetails">
            {campaign.metadata.description}
          </div>
        </div>
      </div>
    </Col>
  );
};

ProductCampaign.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default ProductCampaign;
