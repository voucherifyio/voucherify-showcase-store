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

const AppWebhookWrapper = ({
	dispatch,
	customers,
	currentCustomer,
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
					const customerId = voucher.holder_id;
					let message;
					if (customers.find((customer) => customer.id === customerId)) {
						if (voucher.campaign === 'Referral Campaign Tier 1 - Reward') {
							message = {
								id: voucher.id,
								title: 'Your reward is here!',
								body:
									'Thanks for referring your friend! Referr two more to get even bigger reward!',
								code: voucher.code,
							};
						} else if (
							voucher.campaign === 'Referral Campaign Tier 2 - Reward'
						) {
							message = {
								id: voucher.id,
								title: 'Your reward is here!',
								body:
									'You rule! Thanks for referring three new customers! Here is your final reward!',
								code: voucher.code,
							};
						} else {
							message = {
								id: voucher.id,
								title: 'Your reward is here!',
								body: 'Get the code right now!',
								code: voucher.code,
							};
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
	}, [dispatch, customers]);

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
				<VoucherifyButton code={currentMessageCustomer.messages[0].code} />
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
	};
};

AppWebhookWrapper.propTypes = {
	dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(AppWebhookWrapper);
