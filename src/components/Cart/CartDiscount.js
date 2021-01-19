import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentCartDiscount } from '../../redux/actions/userActions';
import { removePromotionFromCart } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';

const CartDiscount = ({ dispatch, discount, discountedAmount, products }) => {
	return (
		<Row className="discountSection" noGutters={true}>
			{discount.discount.type === 'UNIT' ? (
				<Col xs={12} sm={4} className="sectionTitle">
					Unit discount for{' '}
					<span className="discounted">
						{products.find((p) => p.id === discount.discount.unit_type).name}
					</span>
				</Col>
			) : (
				<Col xs={12} sm={4} className="sectionTitle">
					Discount code <span className="discounted">{discount.code}</span>
				</Col>
			)}
			{discount.hasOwnProperty('banner') && (
				<Col xs={12} sm={4} className="sectionTitle">
					Cart Discount <span className="discounted">{discount.name}</span>
				</Col>
			)}
			{discount.discount.type === 'UNIT' ? (
				<Col xs={6} sm={7} className="discountAmount">
					<span className="discounted">
						$
						{(
							(products.find((p) => p.id === discount.discount.unit_type)
								.price *
								discount.discount.unit_off) /
							100
						).toFixed(2)}
					</span>
				</Col>
			) : (
				<Col xs={6} sm={7} className="discountAmount">
					<span className="discounted">
						${(discountedAmount / 100).toFixed(2)}
					</span>
				</Col>
			)}

			<Col xs={6} sm={1} className="cartItemRemove">
				<Tooltip title="Remove promotion">
					<IconButton
						onClick={() => {
							dispatch(removePromotionFromCart());
							dispatch(setCurrentCartDiscount(null));
						}}
					>
						<ClearIcon />
					</IconButton>
				</Tooltip>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		discount: state.cartReducer.discount,
		discountedAmount: state.cartReducer.discountedAmount,
		products: state.storeReducer.products,
	};
};

export default connect(mapStateToProps)(CartDiscount);

CartDiscount.propTypes = {
	dispatch: PropTypes.func,
	discount: PropTypes.object,
	discountedAmount: PropTypes.number,
	products: PropTypes.array,
};
