import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _orderBy from 'lodash.orderby';
import { setCurrentCartDiscount } from '../../redux/actions/userActions';

const CartPromotionsList = ({
	dispatch,
	disable,
	campaigns,
	currentCartDiscount,
}) => {
	const handleSelectDiscount = (id) => {
		if (currentCartDiscount === id) {
			dispatch(setCurrentCartDiscount(''));
		} else {
			dispatch(setCurrentCartDiscount(id));
		}
	};

	const discountCampaigns = _orderBy(campaigns, ['metadata']['order'], ['asc']);

	// We're creating separate filter only for Cart Discounts
	const cartDiscountCampaigns = discountCampaigns.filter(
		(camp) => camp.campaign_type === 'PROMOTION'
	);

	return (
		<Row className="paymentMethodSection" noGutters={true}>
			<Col sm={4} className="sectionTitle">
				Available Cart Discounts:
			</Col>
			<Col sm={8}>
				<div className="paymentMethodsWrapper">
					{cartDiscountCampaigns.map((campaign) => (
						<div
							key={campaign.id}
							className={
								currentCartDiscount === campaign.id
									? 'cartDiscountAvailable cartDiscountAvailableCurrent'
									: 'cartDiscountAvailable'
							}
							onClick={() => handleSelectDiscount(campaign.id)}
						>
							{campaign.name}
							{/* <OrangeSwitch
									color="default"
									disabled={!enableCartDiscounts}
									checked={currentCartDiscount === campaign.id ? true : false}
									onClick={(event) => event.stopPropagation()}
									onChange={handleSwitchChange(campaign.id)}
								/>
								<p>{campaign.name}</p> */}
						</div>
					))}
				</div>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		campaigns: state.userReducer.campaigns,
		currentCartDiscount: state.userReducer.currentCartDiscount,
	};
};
export default connect(mapStateToProps)(CartPromotionsList);

CartPromotionsList.propTypes = {
	dispatch: PropTypes.func.isRequired,
	disable: PropTypes.bool,
};
