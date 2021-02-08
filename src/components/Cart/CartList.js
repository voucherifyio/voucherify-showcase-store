import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import PaymentMethod from './PaymentMethod';
import CartDiscountForm from './CartDiscountForm';
import CartDiscount from './CartDiscount';
import CartTotals from './CartTotals';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';
import Col from 'react-bootstrap/Col';
import CartPromotionsList from './CartPromotionsList';

const CartList = ({ items, discount, enableCartDiscounts }) => {
	const [discountForm, setDiscountForm] = useState(true);

	const [disableForm, setDisableForm] = useState(true);

	useEffect(() => {
		if (!_isEmpty(discount)) {
			setDiscountForm(false);
		} else {
			setDiscountForm(true);
		}
		if (enableCartDiscounts) {
			setDisableForm(true);
		} else if (!enableCartDiscounts) {
			setDisableForm(false);
		}
	}, [discount, enableCartDiscounts]);

	return (
		<Col className="cartListWrapper">
			<h4>Your cart</h4>
			<div className="cartWrapper">
				{items.map((item) => (
					<CartItem key={item.id} id={item.id} />
				))}
				<PaymentMethod />
				{discountForm && !disableForm && (
					<CartDiscountForm disable={disableForm} />
				)}
				{disableForm && <CartPromotionsList />}
				{!_isEmpty(discount) && <CartDiscount />}
				<CartTotals />
			</div>
		</Col>
	);
};

const mapStateToProps = (state) => {
	return {
		itemsTotalCount: state.cartReducer.itemsTotalCount,
		discountedAmount: state.cartReducer.discountedAmount,
		items: state.cartReducer.items,
		enableCartDiscounts: state.userReducer.enableCartDiscounts,
		discount: state.cartReducer.discount,
	};
};

export default connect(mapStateToProps)(CartList);

CartList.propTypes = {
	items: PropTypes.array,
	discount: PropTypes.object,
	discountedAmount: PropTypes.number,
	enableCartDiscounts: PropTypes.bool,
};
