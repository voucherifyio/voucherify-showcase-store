import React from 'react';
import Form from 'react-bootstrap/Form';

const ProductQuantityForm = ({ quantity, handleOnChange }) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Form inline className="productQuantityWrapper">
      <Form.Control
        placeholder="quantity"
        as="select"
        id="productQuantity"
        onChange={(e) => handleOnChange(e)}
        value={quantity}
        className="productQuantity"
      >
        {quantities.map((qty) => (
          <option key={qty} value={qty}>
            Quantity: {qty}
          </option>
        ))}
      </Form.Control>
    </Form>
  );
};

export default ProductQuantityForm;
