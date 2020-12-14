import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import ArrowLine from '../../assets/ArrowLine.png';
import CustomersModalCustomer from './CustomersModalCustomer';
import './style.css';
import VoucherifyLogo from '../../assets/VoucherifyLogo.png';
import ArrowIcon from '../../assets/ArrowIcon.png';
const CustomersModal = ({ customers, campaigns }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	/* eslint-disable */
	const herokuLink =
		'https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2F&template=https%3A%2F%2Fgithub.com%2Fvoucherifyio%2Fvoucherify-showcase-store%2F';
	/* eslint-enable */

	useEffect(() => {
		if (!_isEmpty(customers) && !_isEmpty(campaigns)) {
			setIsLoaded(true);
		}
	}, [campaigns, customers]);
	return (
		<div className="customersModalWrapper">
			{!isLoaded ? (
				<Spinner animation="grow" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			) : (
				<div className="customersModal">
					<img className="customersModalArrowLine" alt="" src={ArrowLine} />
					<div className="customersModalDescWrapper">
						<h1 className="customersModalTitle">
							Welcome to Hot Beans — Voucherify demo store
						</h1>
						<p className="customersModalDesc">
							Log in to explore various promotional and referral workflows we
							have predefined in Voucherify dashboard. You can enable and
							disable active promotions in the control panel on your right.{' '}
							<span className="customersModalDescBold">
								Remember to switch between customers to learn how promotion
								personalization works!
							</span>
						</p>
					</div>
					<div className="customersModalCustomers">
						{customers
							.filter(
								(cust) =>
									cust.metadata.title !== 'Referral Friend #1' &&
									cust.metadata.title !== 'Referral Friend #2' &&
									cust.metadata.title !== 'Referral Friend #3'
							)
							.map((customer) => (
								<CustomersModalCustomer
									key={customer.name}
									customer={customer}
								/>
							))}
					</div>
					<div className="customersModalSourceLinks">
						<div className="sourceLinkWrapper">
							<a href={herokuLink} className="customersModalArrowLink">
								<img className="customersModalArrow" alt="" src={ArrowIcon} />
								<div className="customersModalLink">
									Connect this showcase to your Voucherify account
								</div>
							</a>
						</div>
						<div className="sourceLinkWrapper">
							<a
								href="https://github.com/voucherifyio/voucherify-showcase-store"
								className="customersModalArrowLink"
							>
								<img className="customersModalArrow" alt="" src={ArrowIcon} />
								<div className="customersModalLink">Check the source code</div>
							</a>
						</div>
					</div>

					<div className="customersModalFooter">
						<div className="voucherifyLogoWrapper">
							<a href="https://voucherify.io">
								<img
									className="voucherifyLogo"
									alt="Voucherify logo"
									src={VoucherifyLogo}
								/>
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		customers: state.userReducer.customers,
		campaigns: state.userReducer.campaigns,
	};
};

export default connect(mapStateToProps)(CustomersModal);

CustomersModal.propTypes = {
	customers: PropTypes.array,
	campaigns: PropTypes.array,
};
