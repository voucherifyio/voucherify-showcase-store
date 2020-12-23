import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import VoucherifyButton from '../../App/VoucherifyButton';
import { publishCampaign } from '../../../redux/actions/userActions';

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

	const locationSuccess = async (position) => {
		setGeolocationText('Location sent!');

		// We're passing receivied coordinates to OpenWeatherMap API
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
		);
		const weather = await res.json();
		const temp = weather.main.temp;
		let isCold = false;
		let isSnow = false;

		// We're checking current weather for snow
		weather.weather.forEach((data) => {
			if (data.main === 'Snow') {
				isSnow = true;
			}
		});

		// We're checking if current temp is lower than -15 deg. celcius
		if (temp < -15) {
			isCold = true;
		}

		if (isSnow && isCold) {
			// If it's snowing and it's more than -15 deg. celcius - we're publishing gift card from 'Let it snow 2' campaign
			await dispatch(publishCampaign({ name: 'Let it snow 2' }));
		} else if (isSnow && !isCold) {
			// If it's snowing but it's less than -15 deg. celcius - we're publishing voucher from 'Let it snow 1' campaign
			await dispatch(publishCampaign({ name: 'Let it snow 1' }));
		}
	};

	return (
		<div className="carouselBanner">
			<div className="carouselBannerText">
				<h3 className="carouselBannerTitle">Is it snowing down there?</h3>
				<div className="carouselBannerDescription">
					<p>
						If it is snowing in your location, you will get a 10% discount
						voucher valid if your order is above 50$.
					</p>
					<p>
						If it is snowing and the temperature is below -15C in your location,
						you will get a 40$ gift card, valid if your order is above 100$.
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
