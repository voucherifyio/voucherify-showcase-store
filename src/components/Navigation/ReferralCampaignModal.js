import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppModal from '../App/AppModal';
import VoucherifyButton from '../App/VoucherifyButton';
import VoucherifyInformation from '../App/VoucherifyInformation';
import Button from 'react-bootstrap/Button';

const ReferralCampaignModal = ({
	currentCustomer,
	customers,
	referralCampaign,
	referralCampaignCode,
	show,
	onHide,
	handleSelectCustomer,
}) => {
	return (
		<AppModal show={show} onHide={onHide}>
			{referralCampaign.name}
			<p>{referralCampaign.metadata.description}</p>
			<div className="code-btn__wrapper">
				<VoucherifyButton code={referralCampaignCode} />
			</div>
			<VoucherifyInformation>
				<p>
					Copy the code above and switch the customer{' '}
					<b>
						(click on your avatar in the navigation bar or select the customer
						below)
					</b>
					. You can use three new customers to use in your referral campaigns.
					After redeeming the referral code as another customer, switch back to{' '}
					<b>
						{currentCustomer.name} ({currentCustomer.metadata.title})
					</b>{' '}
					and wait to receive the reward.
				</p>
				<div className="referralCustomers">
					{customers
						.filter(
							(cust) =>
								cust.metadata.title === 'Referral Friend #1' ||
								cust.metadata.title === 'Referral Friend #2' ||
								cust.metadata.title === 'Referral Friend #3'
						)
						.map((customer) => (
							<div
								key={customer.id}
								className="referralCustomers__customer"
								onClick={() => handleSelectCustomer(customer.id)}
							>
								<h6 className="referralCustomers__title">
									{customer.metadata.title}
								</h6>
								<Button
									onClick={() => handleSelectCustomer(customer.id)}
									className="voucherifyButtonDark"
								>
									Login
								</Button>
							</div>
						))}
				</div>
			</VoucherifyInformation>
		</AppModal>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
		customers: state.userReducer.customers,
		campaigns: state.userReducer.campaigns,
	};
};

export default connect(mapStateToProps)(ReferralCampaignModal);

ReferralCampaignModal.propTypes = {
	currentCustomer: PropTypes.object,
	dispatch: PropTypes.func,
	customers: PropTypes.array,
	referralCampaign: PropTypes.object,
	referralCampaignCode: PropTypes.string,
	show: PropTypes.bool,
	onHide: PropTypes.func,
	handleSelectCustomer: PropTypes.func,
};
