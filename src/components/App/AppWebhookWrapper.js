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
import PersonIcon from '@material-ui/icons/Person';

const AppWebhookWrapper = ({
	dispatch,
	customers,
	currentCustomer,
	products,
	webhookMessages,
}) => {
	const [modalShow, setModalShow] = useState(true);

	useEffect(() => {
		const socket = socketIOClient(`${process.env.REACT_APP_API_URL || ''}`);
		socket.on('new-message', (data) => {
			const voucher = data.data.voucher;
			switch (data.type) {
				case 'voucher.published':
					if (
						customers.find((customer) => customer.id === voucher.holder_id) &&
						(!voucher.metadata.hasOwnProperty('auto_publish') ||
							(voucher.metadata.hasOwnProperty('auto_publish') &&
								voucher.metadata.auto_publish === false))
					) {
						const customerId = voucher.holder_id;
						if (voucher.campaign === 'Referral Campaign') {
							const message = {
								id: voucher.id,
								title: 'Welcome to Hot Beans Referral Campaign',
								body:
									'Nicely done! Share this code with your friends to get amazing rewards!',
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
						} else if (
							voucher.campaign === 'Join our newsletter and get $5 discount'
						) {
							const message = {
								id: voucher.id,
								title: voucher.metadata.message_title,
								body: voucher.metadata.message_body,
								code: voucher.code,
							};

							dispatch(getMessage(customerId, message));
							dispatch(getCampaigns());
							return setModalShow(true);
						} else if (voucher.campaign === 'Loyalty Campaign') {
							const message = {
								id: voucher.id,
								title: voucher.metadata.message_title,
								body: voucher.metadata.message_body,
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
						} else if (voucher.campaign === 'Let it snow') {
							const message = {
								id: voucher.id,
								title: voucher.metadata.message_title,
								body: voucher.metadata.message_body,
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
						} else {
							const title = voucher.campaign
								? `Here is your coupon from ${voucher.campaign}`
								: `Here is your ${voucher.code} coupon`;

							const message = {
								id: voucher.id,
								title,
								body:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
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
								message.body = voucher.metadata.message_body;
								message.code = voucher.code;
							} else if (
								voucher.campaign === 'Referral Reward Tier 2 - Voucher 10%'
							) {
								message.body = voucher.metadata.message_body;
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
					if (currentMessageCustomer.messages.length === 0) {
						setModalShow(false);
					}
					dispatch(removeMessage(currentCustomer.id));
				}}
			>
				<h1 className="webhookModalTitle">
					{currentMessageCustomer.messages[0].title}
				</h1>
				<div className="webhookModalEmailHeader">
					<div className="emailIcon">
						<PersonIcon />
					</div>
					<div>
						<p>
							<span className="emailFrom">Voucherify</span>{' '}
							&lt;voucherify@voucherify.io&gt;
						</p>
						<p>To me</p>
					</div>
					<p>18:30 (10 minutes ago)</p>
				</div>
				<p>{currentMessageCustomer.messages[0].body}</p>
				{currentMessageCustomer.messages[0].hasOwnProperty('code') && (
					<div className="emailCta">
						<p>Here is your code, copy it to use in checkout</p>
						<VoucherifyButton code={currentMessageCustomer.messages[0].code} />
					</div>
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
								alt={currentMessageCustomer.messages[0].product}
							/>
						</div>
						<h4 className="emailProduct">
							{currentMessageCustomer.messages[0].product}
						</h4>
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
