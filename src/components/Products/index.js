import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import DiscountCarousel from './DiscountCarousel';

const Products = ({ products, fetchingProducts, campaigns }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<DiscountCarousel />
			<div className="page productPage">
				{fetchingProducts ? (
					<div className="spinnerWrapper">
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</div>
				) : (
					<>
						<Row className="products">
							<Col lg={12}>
								<h1 className="pageTitle">Products</h1>
							</Col>
							{/* <Col lg={6} md={12} className="productCategoryFormWrapper"></Col> */}
						</Row>

						<Row className="products">
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									campaigns={campaigns}
								></ProductCard>
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
		campaigns: state.userReducer.campaigns,
		currentCustomer: state.userReducer.currentCustomer,
	};
};

export default connect(mapStateToProps)(Products);

Products.propTypes = {
	fetchingProducts: PropTypes.bool.isRequired,
	products: PropTypes.array,
	campaigns: PropTypes.array,
};
