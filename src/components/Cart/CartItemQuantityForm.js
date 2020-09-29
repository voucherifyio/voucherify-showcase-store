import React from 'react';
import Form from 'react-bootstrap/Form';

const CartItemQuantityForm = ({ count, handleOnChange }) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Form.Control
      inline
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
