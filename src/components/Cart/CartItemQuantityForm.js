import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const CartItemQuantityForm = ({ count, handleOnChange }) => {
  let quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (count > 10) {
    quantities = Array.from({ length: count }, (_, i) => i + 1);
  }

  return (
    <Form.Control
      inline="true"
      as="select"
      id="productQuantity"
      onChange={(e) => handleOnChange(e)}
      value={count}
    >
      {quantities.map((qty) => (
        <option key={qty} value={qty}>
          {qty}
        </option>
      ))}
    </Form.Control>
  );
};

export default CartItemQuantityForm;

CartItemQuantityForm.propTypes = {
  count: PropTypes.number,
  handleOnChange: PropTypes.func,
};
