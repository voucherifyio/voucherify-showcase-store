import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';
import _isEmpty from 'lodash.isempty';

const SidebarQualifications = ({ qualifications, fetchingQualifications }) => {
	/* eslint-disable */
	const qualificationsToolTip =
		'The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart.';
	/* eslint-enable */
	return (
		<>
			<div className="sidebarSection qualificationSection">
				<div className="sidebarSectionHeading">
					<span className="sidebarSectionTitle">Qualifications</span>{' '}
					<Tooltip className="titleTooltip" title={qualificationsToolTip}>
						<InfoIcon />
					</Tooltip>
				</div>

				<div className="sidebarSectionBody">
					{fetchingQualifications ? (
						<div className="sidebarSpinner">
							<Spinner animation="border" size="sm" role="status">
								<span className="sr-only">Loading...</span>
							</Spinner>
						</div>
					) : (
						<>
							{!_isEmpty(qualifications) && (
								<>
									{qualifications.map((qualification) => (
										<Chip
											key={qualification.id}
											className="qualificationChip"
											label={
												<p className="qualificationChipName">
													{qualification.name ||
														qualification.metadata.name ||
														qualification.metadata.qualification_name ||
														qualification.code}
												</p>
											}
										/>
									))}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		fetchingQualifications: state.userReducer.fetchingQualifications,
		qualifications: state.userReducer.qualifications,
		vouchers: state.userReducer.vouchers,
		campaigns: state.userReducer.campaigns,
		availableCustomers: state.userReducer.availableCustomers,
		fetchingCustomers: state.userReducer.fetchingCustomers,
	};
};

export default connect(mapStateToProps)(SidebarQualifications);

SidebarQualifications.propTypes = {
	fetchingQualifications: PropTypes.bool,
	qualifications: PropTypes.array,
};
