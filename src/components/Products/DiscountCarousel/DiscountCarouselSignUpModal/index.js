import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import {
	updateCurrentCustomerEmail,
	publishCampaign,
	// getCampaigns,
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
	// const [modalShow, setModalShow] = useState(false);
	const handleChange = (event) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (re.test(event.target.value)) {
			setEmail(event.target.value);
			setSubmit(false);
		}
	};

	const asyncDispatch = async () => {
		await dispatch(updateCurrentCustomerEmail(email));
		await dispatch(publishCampaign(campaign));
		// await dispatch(getCampaigns());
		onHide();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		asyncDispatch();
	};
	return (
		<AppModal show={show} onHide={onHide}>
			{campaign.name}
			{currentCustomer.email ? (
				<>
					<p className="signUpModalFormResult">Thank you for subscribing!</p>
				</>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail" className="emailInput">
						<Form.Label>Your email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							onChange={handleChange}
						/>
						<Form.Text className="emailMutedText">
							This is a fake shop, no email will be sent. To find the newly
							assigned coupon, check the customer profile in the sidebar. To
							learn how Voucherify Distribution works in real life, go to our{' '}
							<a
								href="https://support.voucherify.io/article/19-how-does-the-distribution-manager-work"
								className="voucherifyLink"
							>
								Help Center
							</a>
							.
						</Form.Text>
					</Form.Group>
					<div className="buttonWrapper">
						<Button
							disabled={submit}
							className="voucherifyButtonDark"
							type="submit"
						>
							Submit
						</Button>
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

export default connect(mapStateToProps)(
	React.memo(DiscountCarouselSignUpModal)
);

DiscountCarouselSignUpModal.propTypes = {
	onHide: PropTypes.func,
	show: PropTypes.bool,
	campaign: PropTypes.object,
};
