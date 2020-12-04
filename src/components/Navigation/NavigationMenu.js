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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { clearMessages } from '../../redux/actions/webhookActions';
import Spinner from 'react-bootstrap/Spinner';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReferralCampaignModal from './ReferralCampaignModal';
import DashboardIcon from '@material-ui/icons/Dashboard';

const refCamp = (campaigns) =>
	campaigns.find((camp) => camp.name === 'Referral Campaign');

const StyledBadge = withStyles(() => ({
	badge: {
		backgroundColor: 'yellow',
		color: 'black',
	},
}))(Badge);

const NavigationMenu = ({
	itemsTotalCount,
	currentCustomer,
	customers,
	campaigns,
	dispatch,
	fetchingCustomer,
	fetchingCustomers,
}) => {
	const [modalShow, setModalShow] = useState(false);
	const [referralCampaign, setReferralCampaign] = useState(null);
	const [referralCampaignCode, setReferralCampaignCode] = useState(null);
	const [showBadge, setShowBadge] = useState(true);
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
			<Col className="navigationMenu">
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
					</NavDropdown>
				)}
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
				<Tooltip title="Generate new set of customers">
					<IconButton className="navigationMenuIcon" onClick={handleLogOut}>
						<ExitToAppIcon />
					</IconButton>
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
	};
};

export default connect(mapStateToProps)(NavigationMenu);

NavigationMenu.propTypes = {
	itemsTotalCount: PropTypes.number,
	currentCustomer: PropTypes.object,
	dispatch: PropTypes.func,
	customers: PropTypes.array,
};
