import './style.css';

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import VoucherifyButton from '../../App/VoucherifyButton';
import { connect } from 'react-redux';
import { updateCurrentCustomerData } from '../../../redux/actions/userActions';

const GeolocationPromotion = ({ dispatch }) => {
	const [geolocationText, setGeolocationText] = useState('Share geolocation');

	const handleGeolocation = () => {
		// We're checking if user browser supports Geoloacation Web API
		if (!navigator.geolocation) {
			setGeolocationText('Geolocation is not supported by your browser');
		} else {
			setGeolocationText('Locating...');
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
		}
	};

	const locationError = () => {
		setGeolocationText('Error');
	};

	const locationSuccess = async () => {
		const isSnow = true;

		setGeolocationText('Success!');
		await dispatch(updateCurrentCustomerData({ metadata: { isSnow } }));

		setTimeout(() => {
			setGeolocationText('Share geolocation');
		}, 5000);
	};

	return (
		<div className="carouselBanner">
			<div className="carouselBannerText">
				<h3 className="carouselBannerTitle">
					Is it snowing down there?{' '}
					<span role="img" aria-label="Snowflake emoji">
						❄️
					</span>
				</h3>
				<div className="carouselBannerDescription carouselBannerDescriptionGeolocation">
					<p>
						If it is <b>snowing</b> in your location, you will get a a free
						Kleen Kentean - Thermos 750ml discount voucher (valid if your order
						is above $50).
					</p>
				</div>
				<VoucherifyButton
					onClickFunction={() => handleGeolocation()}
					text={geolocationText}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCartDiscount: state.userReducer.currentCartDiscount,
		currentCustomer: state.userReducer.currentCustomer,
		products: state.storeReducer.products,
	};
};

GeolocationPromotion.propTypes = {
	campaign: PropTypes.object,
	currentCustomer: PropTypes.object,
	currentCartDiscount: PropTypes.string,
	products: PropTypes.array,
};

export default connect(mapStateToProps)(GeolocationPromotion);
