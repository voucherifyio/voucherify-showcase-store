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
			console.log(data);
			switch (data.type) {
				case 'voucher.published':
					if (customers.find((customer) => customer.id === voucher.holder_id)) {
						if (
							voucher.campaign === 'Join our newsletter and get 5% discount'
						) {
							const customerId = voucher.holder_id;

							const message = {
								id: voucher.id,
								title: 'Your coupon is here!',
								body: 'Get the code right now!',
								code: voucher.code,
							};

							dispatch(getMessage(customerId, message));
							dispatch(getCampaigns());
							return setModalShow(true);
						}
					}
					return;

				case 'customer.rewarded':
					const customerId =
						voucher !== undefined ? voucher.holder_id : data.data.object.id;
					let message;

					if (customers.find((customer) => customer.id === customerId)) {
						if (voucher !== undefined) {
							if (voucher.campaign === 'Referral Reward Tier 1 - Voucher 5%') {
								message = {
									id: voucher.id,
									title: 'Your reward is here!',
									body:
										'Thanks for referring your friend! Referr two more to get even bigger reward!',
									code: voucher.code,
								};
							} else if (
								voucher.campaign === 'Referral Reward Tier 2 - Voucher 10%'
							) {
								message = {
									id: voucher.id,
									title: 'Your reward is here!',
									body:
										'You rule! Thanks for referring three new customers! Here is your final reward!',
									code: voucher.code,
								};
							} else if (voucher.code) {
								message = {
									id: voucher.id,
									title: 'Your reward is here!',
									body: 'Get the code right now!',
									code: voucher.code,
								};
							}
						} else if (
							data.data.related_object.hasOwnProperty('parameters') &&
							data.data.related_object.parameters.hasOwnProperty('product')
						) {
							message = {
								id: data.data.related_object.id,
								title: 'You get a free product',
								body: 'Contact us to claim your free product!',
								product: products.find(
									(p) => p.id === data.data.related_object.parameters.product.id
								).name,
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
