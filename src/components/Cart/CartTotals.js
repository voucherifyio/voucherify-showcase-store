import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../redux/actions/cartActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CartTotals = ({ totalAmountAfterDiscount, dispatch }) => {
  const totalAmout = `$${(totalAmountAfterDiscount / 100).toFixed(2)}`;
  return (
    <Row className="totalSection" noGutters={true}>
      <Col xs={12} sm={4} className="sectionTitle">
        Order total
      </Col>
      <Col xs={6} sm={5} className="totalAmount">
        {totalAmout}
      </Col>
      <Col xs={1} sm={1}></Col>
      <Col xs={5} sm={2} className="cartItemRemove">
        <Tooltip title="Clear cart">
          <IconButton edge="start" onClick={() => dispatch(clearCart())}>
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
  };
};

export default connect(mapStateToProps)(CartTotals);

CartTotals.propTypes = {
  dispatch: PropTypes.func,
  totalAmountAfterDiscount: PropTypes.number,
};
