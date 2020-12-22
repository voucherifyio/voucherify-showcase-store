import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getCurrentCustomer } from '../../redux/actions/userActions';
import { checkoutCart } from '../../redux/actions/cartActions';

const CartTotals = ({
	currentCustomer,
	totalAmountAfterDiscount,
	dispatch,
}) => {
	const totalAmout = `$${(totalAmountAfterDiscount / 100).toFixed(2)}`;
	return (
		<Row className="totalSection" noGutters={true}>
			<Col xs={12} sm={4} md={4} className="sectionTitle">
				Order total
			</Col>
			<Col xs={12} sm={4} md={4} className="totalAmount">
				{totalAmout}
			</Col>
			<Col xs={10} sm={3} md={3}>
				<Link to="/success">
					<Button
						className="voucherifyButtonDark paymentButton"
						onClick={async () => {
							await dispatch(checkoutCart());
							await dispatch(getCurrentCustomer(currentCustomer.id, 'update'));
						}}
					>
						Pay now
					</Button>
				</Link>
			</Col>
			<Col xs={2} sm={1} className="cartItemRemove">
				<Tooltip title="Clear cart">
					<IconButton onClick={() => dispatch(clearCart())}>
						<ClearIcon />
					</IconButton>
				</Tooltip>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		totalAmountAfterDiscount: state.cartReducer.totalAmountAfterDiscount,
		currentCustomer: state.userReducer.currentCustomer,
	};
};

export default connect(mapStateToProps)(CartTotals);

CartTotals.propTypes = {
	dispatch: PropTypes.func,
	totalAmountAfterDiscount: PropTypes.number,
	currentCustomer: PropTypes.object,
};
