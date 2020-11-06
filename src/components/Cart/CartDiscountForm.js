import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscount } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const CartDiscountForm = ({ dispatch, disable }) => {
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
									disable ? 'Disabled' : 'Your coupon or referral code'
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
					<p className="cartDiscountsInformation">
						With cart discounts enabled you cannot use other vouchers. Disable
						cart discounts in the sidebar to use personal and public codes
					</p>
				)}
			</Col>
		</Row>
	);
};

export default connect()(CartDiscountForm);

CartDiscountForm.propTypes = {
	dispatch: PropTypes.func.isRequired,
	disable: PropTypes.bool,
};
