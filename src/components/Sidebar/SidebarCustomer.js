import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash.isempty';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const SidebarCustomer = ({ currentCustomer, dispatch }) => {
	const customerDate = new Date(currentCustomer.summary.orders.last_order_date);

	const dateText = `${('0' + customerDate.getDate()).slice(-2)}.
    ${('0' + (customerDate.getMonth() + 1)).slice(-2)}.
    ${customerDate.getFullYear()} @ 
    ${('0' + customerDate.getHours()).slice(-2)}:${(
		'0' + customerDate.getMinutes()
	).slice(-2)}`;

	const handleGetCurrentCustomer = () => {
		dispatch(getCurrentCustomer(currentCustomer.id));
	};

	return (
		<>
			<div className="sidebarSection">
				<div className="sidebarSectionHeading">
					<span className="sidebarSectionTitle">Customer</span>
					<Tooltip title="Refresh current customer">
						<IconButton onClick={handleGetCurrentCustomer}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				</div>

				<div className="sidebarSectionBody">
					<p className="sidebarSectionCustomerData">
						Customer:{' '}
						<span className="sidebarSectionCustomerDataContent">
							{currentCustomer.name}
						</span>
					</p>
					<p className="sidebarSectionCustomerData">
						Location:{' '}
						<span className="sidebarSectionCustomerDataContent">
							{currentCustomer.address.country}
						</span>
					</p>
					<p className="sidebarSectionCustomerData">
						Amount spent:{' '}
						<span className="sidebarSectionCustomerDataContent">
							${(currentCustomer.summary.orders.total_amount / 100).toFixed(2)}
						</span>
					</p>
					<p className="sidebarSectionCustomerData">
						Last order:{' '}
						<span className="sidebarSectionCustomerDataContent">
							{dateText}
						</span>
					</p>
					<p className="sidebarSectionCustomerData">
						Email:{' '}
						<span className="sidebarSectionCustomerDataContent">
							{_isEmpty(currentCustomer.email)
								? 'Not submitted'
								: currentCustomer.email}
						</span>
					</p>
					<p className="sidebarSectionCustomerData">
						Referred customers:{' '}
						<span className="sidebarSectionCustomerDataContent">
							{currentCustomer.loyalty.referred_customers}
						</span>
					</p>
					<a
						href={currentCustomer.assets.cockpit_url}
						className="sidebarSectionCustomerData"
						rel="noopener noreferrer"
						target="_blank"
					>
						Check customer cockpit
					</a>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		currentCustomer: state.userReducer.currentCustomer,
	};
};

export default connect(mapStateToProps)(SidebarCustomer);

SidebarCustomer.propTypes = {
	currentCustomer: PropTypes.object,
};
