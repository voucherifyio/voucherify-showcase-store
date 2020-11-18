import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';
import { IconButton, Tooltip } from '@material-ui/core';
import _isEmpty from 'lodash.isempty';
import VoucherifyButton from '../App/VoucherifyButton';

const SidebarRewards = ({ filteredRewardCampaigns, currentCustomer }) => {
	return (
		<>
			<div className="sidebarSection qualificationSection">
				<div className="sidebarSectionHeading">
					<span className="sidebarSectionTitle">Referral Rewards</span>{' '}
					<Tooltip title="Rewards are triggered asynchronously">
						<IconButton>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</div>

				<div className="sidebarSectionBody">
					{!_isEmpty(
						filteredRewardCampaigns.filter((camp) =>
							camp.coupons.find(
								(coupon) => coupon.currentCustomer === currentCustomer.id
							)
						)
					) ? (
						filteredRewardCampaigns
							.filter((camp) =>
								camp.coupons.find(
									(coupon) => coupon.currentCustomer === currentCustomer.id
								)
							)
							.map((campaign) => (
								<div key={campaign.name}>
									{!_isEmpty(campaign.coupons) &&
										campaign.coupons.find(
											(coupon) => coupon.currentCustomer === currentCustomer.id
										) && (
											<VoucherifyButton
												specialText={true}
												tooltip={false}
												text={`${
													campaign.coupons.find(
														(coupon) =>
															coupon.currentCustomer === currentCustomer.id
													).customerDataCoupon
												} - Reward ${
													campaign.voucher.discount.type === 'PERCENT'
														? `${campaign.voucher.discount.percent_off}% OFF`
														: `$${campaign.voucher.discount.amount_off} OFF`
												}`}
												code={
													campaign.coupons.find(
														(coupon) =>
															coupon.currentCustomer === currentCustomer.id
													).customerDataCoupon
												}
											/>
										)}
								</div>
							))
					) : (
						<div className="qualificationDescription">
							<p>Waiting for successful referrals...</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		vouchers: state.userReducer.vouchers,
		campaigns: state.userReducer.campaigns,
		currentCustomer: state.userReducer.currentCustomer,
	};
};

export default connect(mapStateToProps)(SidebarRewards);

SidebarRewards.propTypes = {
	filteredRewardCampaigns: PropTypes.array,
	currentCustomer: PropTypes.object,
};
