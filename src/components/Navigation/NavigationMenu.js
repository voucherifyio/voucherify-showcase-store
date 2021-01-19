import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';
import NavDropdown from 'react-bootstrap/NavDropdown';
import _isEmpty from 'lodash.isempty';
import { setEnableSidebar, newSession } from '../../redux/actions/userActions';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { clearMessages } from '../../redux/actions/webhookActions';
import Spinner from 'react-bootstrap/Spinner';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReferralCampaignModal from './ReferralCampaignModal';
import DashboardIcon from '@material-ui/icons/Dashboard';
import _orderBy from 'lodash.orderby';
import Switch from '@material-ui/core/Switch';
import {
	setEnableCartDiscounts,
	setCurrentCartDiscount,
	getQualifications,
} from '../../redux/actions/userActions';
import {
	getCartDiscount,
	removePromotionFromCart,
} from '../../redux/actions/cartActions';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import VoucherifyButton from '../App/VoucherifyButton';

const refCamp = (campaigns) =>
	campaigns.find((camp) => camp.name === 'Referral Campaign');

const StyledBadge = withStyles(() => ({
	badge: {
		backgroundColor: 'yellow',
		color: 'black',
	},
}))(Badge);

const OrangeSwitch = withStyles({
	switchBase: {
		color: 'white',
		'&$checked': {
			color: 'var(--orange)',
		},
		'&$checked + $track': {
			backgroundColor: 'var(--orange)',
		},
	},
	checked: {},
	track: {},
})(Switch);

const NavigationMenu = ({
	itemsTotalCount,
	currentCustomer,
	customers,
	campaigns,
	dispatch,
	fetchingCustomer,
	fetchingCustomers,
	currentCartDiscount,
	enableCartDiscounts,
	items,
	qualifications,
	fetchingQualifications,
}) => {
	const [modalShow, setModalShow] = useState(false);
	const [referralCampaign, setReferralCampaign] = useState(null);
	const [referralCampaignCode, setReferralCampaignCode] = useState(null);
	const [showBadge, setShowBadge] = useState(true);

	const handleSwitchChange = (panel) => (event, newActiveCartDiscount) => {
		dispatch(setCurrentCartDiscount(newActiveCartDiscount ? panel : ''));
	};

	const handleDiscountSwitchChange = () => {
		dispatch(setEnableCartDiscounts(!enableCartDiscounts));
	};

	const handleGetQualifications = () => {
		dispatch(getQualifications());
	};

	useEffect(() => {
		if (enableCartDiscounts && currentCartDiscount) {
			dispatch(getCartDiscount(currentCartDiscount));
		} else if (currentCartDiscount === '') {
			dispatch(removePromotionFromCart());
			dispatch(setCurrentCartDiscount(''));
		}
	}, [dispatch, currentCartDiscount, enableCartDiscounts, items]);

	const discountCampaigns = _orderBy(campaigns, ['metadata']['order'], ['asc']);

	// We're creating separate filter only for Cart Discounts
	const cartDiscountCampaigns = discountCampaigns.filter(
		(camp) => camp.campaign_type === 'PROMOTION'
	);

	const referralCamp = useMemo(() => refCamp(campaigns), [campaigns]);

	const handleOnHide = () => {
		setModalShow(!modalShow);
	};

	const handleSelectCustomer = (id) => {
		dispatch(getCurrentCustomer(id));
		setModalShow(false);
	};

	useEffect(() => {
		if (!_isEmpty(referralCamp)) {
			const referralCampaignCode = !_isEmpty(referralCamp.coupons)
				? referralCamp.coupons.find(
						(coupon) => coupon.customer === currentCustomer.id
				  ).code
				: '';
			setReferralCampaign(referralCamp);
			setReferralCampaignCode(referralCampaignCode);
		}
	}, [referralCamp, campaigns, currentCustomer]);

	const handleLogOut = () => {
		dispatch(clearMessages());
		dispatch(newSession());
	};

	const handleSwitchCustomer = (customer) => {
		dispatch(setEnableSidebar(false));
		dispatch(getCurrentCustomer(customer.id));
	};

	return (
		<>
			<Col sm={12} md={12} lg={9} className="navigationMenu">
				{fetchingCustomer || fetchingCustomers ? (
					<div className="changeUserSpinner">
						<Spinner animation="border" size="sm" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</div>
				) : (
					<NavDropdown
						className="navigationMenuUser"
						title={
							<Tooltip title="Change customer">
								<div>
									{currentCustomer.metadata.avatar ? (
										<img
											src={currentCustomer.metadata.avatar}
											className="navigationMenuUserAvatar"
											alt="Customer Avatar"
										/>
									) : (
										<AccountCircleIcon />
									)}
									Hi, <b>{currentCustomer.metadata.firstName}</b>
								</div>
							</Tooltip>
						}
					>
						{customers
							.filter((customer) => customer.id !== currentCustomer.id)
							.map((cust) => (
								<NavDropdown.Item
									onClick={() => handleSwitchCustomer(cust)}
									key={cust.id}
									className="navigationMenuUserDropdownItem"
								>
									<div className="customerNavigationTitle">
										{cust.metadata.title}
									</div>
									<div className="customerNavigationDescription">
										{cust.metadata.description}
									</div>
								</NavDropdown.Item>
							))}
						<NavDropdown.Item onClick={handleLogOut}>
							<div className="customerNavigationTitle">Log out</div>
							<div className="customerNavigationDescription">
								Generate new set of customers
							</div>
						</NavDropdown.Item>
					</NavDropdown>
				)}
				<NavDropdown
					className="navigationMenuUser"
					title={
						<Tooltip title="Select cart discount">
							<div className="cartDiscountsMenu">
								<MonetizationOnIcon className="navigationMenuUserAvatar" />
								<b>Cart discounts</b>
							</div>
						</Tooltip>
					}
				>
					<NavDropdown.Item onClick={(event) => event.stopPropagation()}>
						<div onClick={(event) => event.stopPropagation()}>
							<OrangeSwitch
								color="default"
								disabled={currentCartDiscount ? true : false}
								checked={enableCartDiscounts}
								onChange={() => handleDiscountSwitchChange()}
							/>
							Enable Cart Discounts
						</div>
					</NavDropdown.Item>
					{cartDiscountCampaigns.map((campaign) => (
						<NavDropdown.Item
							key={campaign.id}
							className="navigationMenuDropdownItemCartDiscount"
						>
							<OrangeSwitch
								color="default"
								disabled={!enableCartDiscounts}
								checked={currentCartDiscount === campaign.id ? true : false}
								onClick={(event) => event.stopPropagation()}
								onChange={handleSwitchChange(campaign.id)}
							/>
							<p>{campaign.name}</p>
						</NavDropdown.Item>
					))}
				</NavDropdown>
				<NavDropdown
					className="navigationMenuUser qualificationMenu"
					title={
						<Tooltip title="Check qualifications">
							<div className="cartDiscountsMenu qualificationMenu">
								<HelpOutlineIcon className="navigationMenuUserAvatar" />
								<b>Qualifications</b>
							</div>
						</Tooltip>
					}
				>
					<NavDropdown.Item onClick={(event) => event.stopPropagation()}>
						<div
							className="getQualificationsWrapper qualificationMenu"
							onClick={(event) => event.stopPropagation()}
						>
							<VoucherifyButton
								onClickFunction={handleGetQualifications}
								text="Get qualifications"
							/>
						</div>
					</NavDropdown.Item>
					{fetchingQualifications ? (
						<NavDropdown.Item className="qualificationMenu">
							<div className="sidebarSpinner getQualificationsSpinner">
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</div>
						</NavDropdown.Item>
					) : (
						<>
							{!_isEmpty(qualifications) && (
								<>
									{qualifications
										.filter(
											(qualification) =>
												qualification.name ||
												qualification.metadata.name ||
												qualification.metadata.qualification_name ||
												qualification.code
										)
										.map((qualification, index) => (
											<NavDropdown.Item
												key={index}
												className="navigationMenuDropdownItemCartDiscount qualificationMenu"
											>
												<p>
													{qualification.name ||
														qualification.metadata.name ||
														qualification.metadata.qualification_name ||
														qualification.code}
												</p>
											</NavDropdown.Item>
										))}
								</>
							)}
						</>
					)}
				</NavDropdown>
				<Tooltip title="Your dashboard">
					<IconButton
						href={currentCustomer.assets.cockpit_url}
						rel="noopener noreferrer"
						target="_blank"
						className="navigationMenuIcon"
					>
						<DashboardIcon />
					</IconButton>
				</Tooltip>
				{!_isEmpty(referralCampaign) && !_isEmpty(referralCampaignCode) && (
					<>
						<div className="customBadgeWrapper">
							<div
								className={
									showBadge
										? 'customBadge pulsate'
										: 'customBadge pulsate hidden'
								}
							></div>
							<Tooltip title="Refer a friend!">
								<IconButton
									onClick={() => {
										setModalShow(true);
										setShowBadge(false);
									}}
									className="navigationMenuIcon"
								>
									<GroupAddIcon />
								</IconButton>
							</Tooltip>
						</div>
						<ReferralCampaignModal
							show={modalShow}
							onHide={handleOnHide}
							referralCampaign={referralCampaign}
							referralCampaignCode={referralCampaignCode}
							handleSelectCustomer={handleSelectCustomer}
						/>
					</>
				)}
				<Tooltip title="Go to cart">
					<Link to="/cart">
						<IconButton className="navigationMenuIcon">
							<StyledBadge badgeContent={itemsTotalCount}>
								<ShoppingCartIcon />
							</StyledBadge>
						</IconButton>
					</Link>
				</Tooltip>
			</Col>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
		itemsTotalCount: state.cartReducer.itemsTotalCount,
		customers: state.userReducer.customers,
		campaigns: state.userReducer.campaigns,
		fetchingCustomer: state.userReducer.fetchingCustomer,
		fetchingCustomers: state.userReducer.fetchingCustomers,
		enableCartDiscounts: state.userReducer.enableCartDiscounts,
		currentCartDiscount: state.userReducer.currentCartDiscount,
		items: state.cartReducer.items,
		qualifications: state.userReducer.qualifications,
		fetchingQualifications: state.userReducer.fetchingQualifications,
	};
};

export default connect(mapStateToProps)(NavigationMenu);

NavigationMenu.propTypes = {
	itemsTotalCount: PropTypes.number,
	currentCustomer: PropTypes.object,
	dispatch: PropTypes.func,
	customers: PropTypes.array,
};
