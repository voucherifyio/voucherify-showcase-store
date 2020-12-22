import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash.isempty';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppModal from './AppModal';
import socketIOClient from 'socket.io-client';
import VoucherifyButton from './VoucherifyButton';
import { getMessage, removeMessage } from '../../redux/actions/webhookActions';
import {
	getCampaigns,
	addPublishedCodes,
} from '../../redux/actions/userActions';
import { addProductReward } from '../../redux/actions/cartActions';
const AppWebhookWrapper = ({
	dispatch,
	customers,
	currentCustomer,
	products,
	webhookMessages,
}) => {
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const socket = socketIOClient(`${process.env.REACT_APP_API_URL || ''}`);
		socket.on('new-message', (data) => {
			const voucher = data.data.voucher;
			switch (data.type) {
				case 'voucher.published':
					if (customers.find((customer) => customer.id === voucher.holder_id)) {
						const customerId = voucher.holder_id;
						if (
							voucher.campaign === 'Join our newsletter and get $5 discount'
						) {
							const message = {
								id: voucher.id,
								title: 'Your coupon is here!',
								body:
									'Hi! Thank you for subscribing to our newsletter! Here is your $5 discount that you can use for your next order. Enjoy!',
								code: voucher.code,
							};

							dispatch(getMessage(customerId, message));
							dispatch(getCampaigns());
							return setModalShow(true);
						} else if (voucher.campaign === 'Loyalty Campaign') {
							const message = {
								id: voucher.id,
								title: 'Welcome to our Loyalty Campaign',
								body:
									'Exchange loyalty points for discounts (apply the loyalty card code in the checkout), use points to pay for your order, or get a free coffee through your customer cockpit.',
								code: voucher.code,
							};
							dispatch(getMessage(customerId, message));
							dispatch(
								addPublishedCodes(customerId, {
									...voucher,
								})
							);
							dispatch(getCampaigns());
							return setModalShow(true);
						}
					}
					return;

				case 'customer.rewarded':
					const customerId =
						voucher !== undefined ? voucher.holder_id : data.data.object.id;
					let message = {
						title: 'Your reward is here!',
					};

					if (customers.find((customer) => customer.id === customerId)) {
						if (voucher !== undefined) {
							message.id = voucher.id;
							message.code = voucher.code;
							if (voucher.campaign === 'Referral Reward Tier 1 - Voucher 5%') {
								message.body =
									'Thanks for referring your friend! Here is your discount voucher for 5%. Referr two more to get even bigger reward!';
								message.code = voucher.code;
							} else if (
								voucher.campaign === 'Referral Reward Tier 2 - Voucher 10%'
							) {
								message.body =
									'You rule! Thanks for referring three new customers! Here is your final reward - discount voucher for 10%';
								message.code = voucher.code;
							} else if (voucher.code) {
								if (voucher.discount.hasOwnProperty('percent_off')) {
									message.body = `Here is your discount voucher for ${voucher.discount.percent_off}%. Don't forget to use this code during your next checkout!`;
									message.code = voucher.code;
								} else if (voucher.discount.hasOwnProperty('amount_off')) {
									message.body = `Here is your discount voucher for $${
										voucher.discount.amount_off / 100
									}. Don't forget to use this code during your next checkout!`;
									message.code = voucher.code;
								} else {
									message.body =
										// eslint-disable-next-line quotes
										"Congratulations, you've just recieved new discount voucher! Copy this code and use it during your next shopping!";
									message.code = voucher.code;
								}
							}
						} else if (
							data.data.related_object.hasOwnProperty('parameters') &&
							data.data.related_object.parameters.hasOwnProperty('product')
						) {
							const product = products.find(
								(p) => p.id === data.data.related_object.parameters.product.id
							).name;
							message = {
								id: data.data.related_object.id,
								// eslint-disable-next-line quotes
								body: `Congratulations! You've just received a free ${product}. Contact us to receive your gift!`,
								product,
							};
							dispatch(
								addProductReward(data.data.related_object.parameters.product.id)
							);
						}

						dispatch(
							addPublishedCodes(customerId, {
								...voucher,
								is_reward: true,
							})
						);

						dispatch(getMessage(customerId, message));
						dispatch(getCampaigns());
						return setModalShow(true);
					}
					return;

				default:
					return;
			}
		});
	}, [dispatch, customers, products]);

	const currentMessageCustomer = webhookMessages.find(
		(msg) => msg.customerId === currentCustomer.id
	);

	useEffect(() => {
		if (!_isEmpty(currentMessageCustomer)) {
			setModalShow(true);
		}
	}, [currentMessageCustomer, setModalShow]);

	if (
		!_isEmpty(currentMessageCustomer) &&
		!_isEmpty(currentMessageCustomer.messages[0])
	) {
		return (
			<AppModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					dispatch(removeMessage(currentCustomer.id));
				}}
			>
				{currentMessageCustomer.messages[0].title}
				<p>{currentMessageCustomer.messages[0].body}</p>
				{currentMessageCustomer.messages[0].hasOwnProperty('code') && (
					<VoucherifyButton code={currentMessageCustomer.messages[0].code} />
				)}
				{currentMessageCustomer.messages[0].hasOwnProperty('product') && (
					<>
						<div className="productRewardWrapper">
							<img
								src={
									products.find(
										(p) => p.name === currentMessageCustomer.messages[0].product
									).image_url
								}
								alt=""
							/>
						</div>
						<h4>{currentMessageCustomer.messages[0].product}</h4>
					</>
				)}
			</AppModal>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
		customers: state.userReducer.customers,
		webhookMessages: state.webhookReducer.webhookMessages,
		products: state.storeReducer.products,
	};
};

AppWebhookWrapper.propTypes = {
	dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(AppWebhookWrapper);
