import React from 'react';
import Form from 'react-bootstrap/Form';

const ProductsCategoryForm = ({ filterCategory, setFilterCategory }) => {
  const categories = [
    'All products',
    'Coffee',
    'Whole Bean',
    'Fairtrade',
    'Single Origin',
    'Ground',
    'Decaffeinated',
    'Coffee Machines',
    'Accessories',
  ];

  return (
    <Form.Control
      as="select"
      id="storeProducts"
      onChange={(e) => setFilterCategory(e.target.value)}
      value={filterCategory || 'DEFAULT'}
      className="categorySelector"
    >
      <option key="DEFAULT" value="DEFAULT" disabled>
        Select category
      </option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Form.Control>
  );
};

export default ProductsCategoryForm;
