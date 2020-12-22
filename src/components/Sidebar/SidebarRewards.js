import React, { useState, useMemo } from 'react';
import _orderBy from 'lodash.orderby';
import _isEmpty from 'lodash.isempty';
import SidebarDiscountDetails from './SidebarDiscountDetails';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

const discountCampaigns = (campaigns) =>
	_orderBy(campaigns, ['metadata']['order'], ['asc']);

// Filtering campaigns for this particular sidebar panel.

const couponCampaigns = (discountCampaigns) =>
	discountCampaigns.filter(
		(camp) =>
			camp.campaign_type !== 'PROMOTION' &&
			camp.name.toLowerCase().includes('reward') &&
			camp.campaign_type !== 'LOYALTY_PROGRAM' &&
			camp.campaign_type !== 'REFERRAL_PROGRAM' &&
			camp.campaign_type !== 'GIFT_VOUCHERS'
	);

// This is the case for the Cart Discounts and for not yet active coupons
const countCampaigns = (
	filteredCouponCampaigns,
	currentCustomer,
	productRewards
) => {
	let campCount = 0;
	for (let i = 0; i < filteredCouponCampaigns.length; i++) {
		!_isEmpty(filteredCouponCampaigns[i].coupons) &&
			filteredCouponCampaigns[i].coupons.find(
				(coupon) => coupon.customer === currentCustomer.id
			) &&
			campCount++;
	}
	for (let j = 0; j < productRewards.length; j++) {
		campCount++;
	}
	return campCount;
};

const SidebarRewards = ({
	currentCustomer,
	campaigns,
	fetchingCoupons,
	productRewards,
	products,
}) => {
	const [expanded, setExpanded] = useState('');
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const discountedCampaigns = useMemo(() => discountCampaigns(campaigns), [
		campaigns,
	]);

	const filteredCouponCampaigns = useMemo(
		() => couponCampaigns(discountedCampaigns),
		[discountedCampaigns]
	);

	// We're counting Campaigns for each Customer based on published coupons
	const countedCampaigns = useMemo(
		() =>
			countCampaigns(filteredCouponCampaigns, currentCustomer, productRewards),
		[filteredCouponCampaigns, currentCustomer, productRewards]
	);

	return (
		<div>
			{!_isEmpty(campaigns) && !_isEmpty(currentCustomer) && (
				<>
					<div className="sidebarSectionHeading accordionSection">
						<div className="cartDiscountsTitle">
							<span className="sidebarSectionTitle">
								Rewards ({countedCampaigns}){' '}
							</span>
						</div>
						<div className="cartDiscountDescription">
							<ShowMoreText anchorClass="readMore" lines={2}>
								<p>
									Take part in loyalty program or in referral campaign and get
									your unique rewards here!
								</p>
							</ShowMoreText>
						</div>
					</div>

					{fetchingCoupons ? (
						<div className="sidebarSpinner">
							<Spinner animation="border" size="sm" role="status">
								<span className="sr-only">Loading...</span>
							</Spinner>
						</div>
					) : (
						<div className="accordions">
							{filteredCouponCampaigns.map((campaign) => (
								// We're checking avaliable coupons for currentCustomer.
								<div key={campaign.name}>
									{!_isEmpty(campaign.coupons) &&
										campaign.coupons.find(
											(coupon) => coupon.customer === currentCustomer.id
										) && (
											<Accordion
												square
												key={campaign.id}
												expanded={expanded === campaign.id}
												onChange={handleChange(campaign.id)}
												className={
													expanded === campaign.id
														? 'accordionBackground open'
														: 'accordionBackground'
												}
											>
												<AccordionSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls={campaign.id}
													id={campaign.id}
												>
													<p className="accordionTitle">{campaign.name}</p>
												</AccordionSummary>
												<AccordionDetails>
													<SidebarDiscountDetails
														campaign={campaign}
														coupon={campaign.coupons.find(
															(coupon) => coupon.customer === currentCustomer.id
														)}
														code={
															campaign.coupons.find(
																(coupon) =>
																	coupon.customer === currentCustomer.id
															).code
														}
													/>
												</AccordionDetails>
											</Accordion>
										)}
								</div>
							))}
							{productRewards.map((reward) => {
								const rewardedProduct = products.find((p) => p.id === reward);
								return (
									<div key={reward}>
										<div
											className="accordionBackground"
											style={{
												height: '60px',
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<div style={{ height: '35px', marginRight: '15px' }}>
													<img
														style={{ maxHeight: '100%' }}
														src={rewardedProduct.image_url}
														alt=""
													/>
												</div>
												<p className="accordionTitle">{rewardedProduct.name}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
		fetchingCoupons: state.userReducer.fetchingCoupons,
		products: state.storeReducer.products,
		vouchers: state.userReducer.vouchers,
		campaigns: state.userReducer.campaigns,
		customers: state.userReducer.customers,
		fetchingCustomers: state.userReducer.fetchingCustomers,
		items: state.cartReducer.items,
		discount: state.cartReducer.discount,
		productRewards: state.cartReducer.productRewards,
	};
};

export default connect(mapStateToProps)(SidebarRewards);

SidebarRewards.propTypes = {
	currentCustomer: PropTypes.object,
	fetchingCoupons: PropTypes.bool,
	vouchers: PropTypes.array,
	discount: PropTypes.object,
	campaigns: PropTypes.array,
	customers: PropTypes.array,
	fetchingCustomers: PropTypes.bool,
	dispatch: PropTypes.func,
	items: PropTypes.array,
};
