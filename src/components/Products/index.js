import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import _orderBy from 'lodash.orderby';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductsCategoryForm from './ProductsCategoryForm';
import './style.css';
import DiscountCarousel from './DiscountCarousel';

const Products = ({ products, fetchingProducts }) => {
  const [filterCategory, setFilterCategory] = useState('');

  let filteredList;
  if (!fetchingProducts) {
    switch (filterCategory) {
      case '':
      case 'All products':
        filteredList = products;
        break;
      default:
        filteredList = products.filter((product) =>
          product.metadata.categories.includes(filterCategory)
        );
        break;
    }
    filteredList = _orderBy(filteredList, ['source_id'], ['asc']);
  }

  return (
    <>
      <DiscountCarousel />
      <div className="page productPage">
        {/* <div clasName="carouselWrapper"> */}

        {/* </div> */}

        {fetchingProducts ? (
          <div className="spinnerWrapper">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Row className="products">
              <Col lg={6}>
                <h1 className="pageTitle">
                  {filterCategory === '' ? 'Products' : `${filterCategory}`}
                  {/* Products {filterCategory && `- ${filterCategory}`} */}
                </h1>
              </Col>
              <Col lg={6} md={12} className="productCategoryFormWrapper">
                <ProductsCategoryForm
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                />
              </Col>
            </Row>

            <Row className="products">
              {filteredList.map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.storeReducer.products,
    fetchingProducts: state.storeReducer.fetchingProducts,
  };
};

export default connect(mapStateToProps)(Products);

Products.propTypes = {
  fetchingProducts: PropTypes.bool.isRequired,
  products: PropTypes.array,
};
