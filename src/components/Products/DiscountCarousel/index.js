import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import DiscountCarouselBanner from './DiscountCarouselBanner';
import _isEmpty from 'lodash.isempty';

const DiscountCarousel = ({ campaigns }) => {
	return (
		<>
			<div className="carouselWrapper">
				<Carousel
					showThumbs={false}
					stopOnHover={true}
					showStatus={false}
					autoPlay={true}
					interval={5000}
				>
					{/* We filter out campaigns without banners and descriptions */}
					{campaigns
						.filter(
							(camp) =>
								!_isEmpty(camp.metadata.carousel_banner_img_url) &&
								!_isEmpty(camp.metadata.description)
						)
						.map((campaign, i) => (
							<div
								key={i}
								className="carousel"
								style={{
									background: `url(${campaign.metadata.carousel_banner_img_url}) no-repeat center`,
									backgroundSize: 'cover',
								}}
							>
								<DiscountCarouselBanner campaign={campaign} />
							</div>
						))}
				</Carousel>
			</div>
		</>
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
