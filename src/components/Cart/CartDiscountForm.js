import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscount } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import _orderBy from 'lodash.orderby';

const CartDiscountForm = ({ dispatch, disable, campaigns }) => {
	const [code, setCode] = useState('');
	const handleChange = (event) => {
		setCode(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleValidate = (code) => {
		if (code !== '') {
			dispatch(getDiscount(code));
		}
	};

	const discountCampaigns = _orderBy(campaigns, ['metadata']['order'], ['asc']);

	// We're creating separate filter only for Cart Discounts
	const cartDiscountCampaigns = discountCampaigns.filter(
		(camp) => camp.campaign_type === 'PROMOTION'
	);

	return (
		<Row className="discountSection" noGutters={true}>
			<Col sm={4} className="sectionTitle">
				Discount
			</Col>
			<Col sm={8}>
				<Form onSubmit={handleSubmit}>
					<Form.Row className="discountFormRow">
						<Col sm={8}>
							<Form.Control
								type="text"
								placeholder={
									disable
										? 'Disabled'
										: 'Your coupon, referral code or loyalty card'
								}
								value={code}
								onChange={handleChange}
								disabled={disable}
							/>
						</Col>
						<Col sm={4}>
							<Button
								type="submit"
								className="voucherifyButtonDark"
								disabled={code.replace(/^\s+/, '').replace(/\s+$/, '') === ''}
								onClick={() => {
									handleValidate(code);
								}}
							>
								Validate
							</Button>
						</Col>
					</Form.Row>
				</Form>
				{disable && (
					<div>
						<p className="cartDiscountsInformation">
							With cart discounts enabled you cannot use other vouchers. Disable
							cart discounts in the sidebar to use personal and public codes
						</p>
						{cartDiscountCampaigns.map((campaign) => (
							<div
								key={campaign.id}
								className="navigationMenuDropdownItemCartDiscount"
							>
								<div>{campaign.name}</div>
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
				)}
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		campaigns: state.userReducer.campaigns,
	};
};
export default connect(mapStateToProps)(CartDiscountForm);

CartDiscountForm.propTypes = {
	dispatch: PropTypes.func.isRequired,
	disable: PropTypes.bool,
};
