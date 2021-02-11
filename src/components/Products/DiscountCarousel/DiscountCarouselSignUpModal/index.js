import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import {
	updateCurrentCustomerData,
	publishCampaign,
} from '../../../../redux/actions/userActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AppModal from '../../../App/AppModal';
const DiscountCarouselSignUpModal = ({
	campaign,
	dispatch,
	show,
	onHide,
	currentCustomer,
}) => {
	const [email, setEmail] = useState(null);
	const [submit, setSubmit] = useState(true);
	const handleChange = (event) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (re.test(event.target.value)) {
			setEmail(event.target.value);
			setSubmit(false);
		}
	};

	const asyncDispatch = async () => {
		await dispatch(updateCurrentCustomerData({ email }));
		await fetch(`${process.env.REACT_APP_API_URL || ''}/events/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				eventName: 'newsletter_subscribed',
				currentCustomer,
			}),
		});
		await dispatch(publishCampaign(campaign));
		onHide();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		asyncDispatch();
	};
	return (
		<AppModal show={show} onHide={onHide} join>
			<h1 className="signUpModalTitle">{campaign.name}</h1>
			{currentCustomer.email ? (
				<>
					<p className="signUpModalFormResult">Thank you for subscribing!</p>
				</>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail" className="emailInput">
						<Form.Label>Your email address</Form.Label>
						<div className="emailSubmitGroup">
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={handleChange}
							/>
							<Button
								disabled={submit}
								className="voucherifyButtonOrange"
								type="submit"
							>
								Submit
							</Button>
						</div>
						<Form.Text className="emailMutedText">
							This is a fake shop, no email will be sent. To find the newly
							assigned coupon, check the customer profile in the sidebar. To
							learn how Voucherify Distribution works in real life, go to our{' '}
							<a
								href="https://support.voucherify.io/article/19-how-does-the-distribution-manager-work"
								className="voucherifyLink"
								rel="noopener noreferrer"
							>
								Help Center
							</a>
							.
						</Form.Text>
					</Form.Group>
					<div className="buttonWrapper">
						<div className="buttonSeparator"></div>
					</div>
				</Form>
			)}

			{/* </Modal.Body> */}
			{/* </Modal> */}
		</AppModal>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
	};
};

export default connect(mapStateToProps)(DiscountCarouselSignUpModal);

DiscountCarouselSignUpModal.propTypes = {
	onHide: PropTypes.func,
	show: PropTypes.bool,
	campaign: PropTypes.object,
	currentCustomer: PropTypes.object,
};
