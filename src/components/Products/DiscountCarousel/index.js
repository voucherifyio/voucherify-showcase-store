import React, { useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import DiscountCarouselBanner from './DiscountCarouselBanner';
import _isEmpty from 'lodash.isempty';
import GeolocationPromotion from './GeolocationPromotion';

const refSliderCamp = (campaigns) =>
	campaigns.filter(
		(camp) =>
			!_isEmpty(camp.metadata.carousel_banner_img_url) &&
			!_isEmpty(camp.metadata.description)
	);

const DiscountCarousel = ({ campaigns }) => {
	const sliderCamps = useMemo(() => refSliderCamp(campaigns), [campaigns]);

	if (Boolean(process.env.REACT_APP_OPEN_WEATHER_API_KEY)) {
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
						{sliderCamps.map((campaign, i) => (
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
						<div
							className="carousel"
							style={{
								background:
									'url(https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner5.jpg) no-repeat center',
								backgroundSize: 'cover',
							}}
						>
							<GeolocationPromotion />
						</div>
					</Carousel>
				</div>
			</>
		);
	} else {
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
						{sliderCamps.map((campaign, i) => (
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
	}
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
