import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RefreshIcon from '@material-ui/icons/Refresh';
import _isEmpty from 'lodash.isempty';
import { IconButton, Tooltip } from '@material-ui/core';
import { getQualifications } from '../../redux/actions/userActions';
import ShowMoreText from 'react-show-more-text';

const SidebarQualifications = ({
	qualifications,
	fetchingQualifications,
	dispatch,
}) => {
	const handleGetQualifications = () => {
		dispatch(getQualifications());
	};
	return (
		<>
			<div className="sidebarSection qualificationSection">
				<div className="sidebarSectionHeading">
					<span className="sidebarSectionTitle">Qualifications</span>{' '}
					<Tooltip title="Refresh customer qualifications">
						<IconButton onClick={handleGetQualifications}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				</div>
				<div className="qualificationDescription">
					<ShowMoreText anchorClass="readMore" lines={2}>
						<p>
							The qualification endpoint returns all promotions avaliable to the
							given customer profile and orders that meet predefined validation
							rules such as total order value or the minimum number of items in
							the cart.
						</p>
					</ShowMoreText>
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
									{qualifications
										.filter(
											(qualification) =>
												qualification.name ||
												qualification.metadata.name ||
												qualification.metadata.qualification_name ||
												qualification.code
										)
										.map((qualification) => (
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
		customers: state.userReducer.customers,
		fetchingCustomers: state.userReducer.fetchingCustomers,
	};
};

export default connect(mapStateToProps)(SidebarQualifications);

SidebarQualifications.propTypes = {
	fetchingQualifications: PropTypes.bool,
	qualifications: PropTypes.array,
	dispatch: PropTypes.func,
};
