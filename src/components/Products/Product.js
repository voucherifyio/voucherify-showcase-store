import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductQuantityForm from './ProductQuantityForm';
import Badge from '@material-ui/core/Badge';
import Button from 'react-bootstrap/Button';
import _isEmpty from 'lodash.isempty';
import ProductCampaign from './ProductCampaign';

const Product = ({ products, dispatch, campaigns }) => {
	const { productId } = useParams();
	const [quantity, setQuantity] = useState(1);
	const handleOnChange = (e) => {
		setQuantity(e.target.value);
	};
	const product = products.find((product) => product.id === productId);

	const productCampaigns = campaigns.filter(
		(camp) => camp.metadata.promotion_product === product.name
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="page">
				<Row className="pageHeader productPageHeader">
					<Col md={5}>
						<div className="productImageWrapper">
							<img
								src={product.image_url}
								className="productImage"
								alt={product.name}
							/>
						</div>
					</Col>
					<Col>
						<div className="productDescriptionWrapper">
							<div className="pageHeader">
								<div className="productBadges">
									<Badge className="productCompanyBadge">
										{product.metadata.company}
									</Badge>
									{!_isEmpty(productCampaigns) && (
										<Badge className="productDiscountBadge">Sale</Badge>
									)}
								</div>

								<h2 className="productName">{product.name}</h2>
								<h5>Price: ${(product.price / 100).toFixed(2)}</h5>
							</div>
							<div className="productActions">
								<div className="productActionsQuantity">
									Quantity&nbsp;
									<ProductQuantityForm
										handleOnChange={handleOnChange}
										quantity={quantity}
									/>
								</div>
								<Button
									onClick={() => {
										dispatch(
											addItemToCart(product.id, quantity, 'increment_count')
										);
										setQuantity(1);
									}}
									className="voucherifyButtonDark"
								>
									${(quantity * (product.price / 100)).toFixed(2)} - Add to cart
								</Button>
							</div>
							<p className="productDescription">{product.metadata.info}</p>
							<Link to="/">
								<Button className="voucherifyButtonOrange">
									Continue Shopping
								</Button>
							</Link>
						</div>
					</Col>
				</Row>

				{!_isEmpty(productCampaigns) && (
					<Row className="productCampaignsRow">
						<Col xs={12} className="pageHeader">
							<h2>Avaliable promotions</h2>
						</Col>
						{productCampaigns.map((camp) => (
							<ProductCampaign key={camp.id} campaign={camp} />
						))}
					</Row>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		products: state.storeReducer.products,
		itemsTotalCount: state.cartReducer.itemsTotalCount,
		campaigns: state.userReducer.campaigns,
	};
};

export default connect(mapStateToProps)(Product);

Product.propTypes = {
	campaigns: PropTypes.array,
	dispatch: PropTypes.func,
	products: PropTypes.array.isRequired,
	itemsTotalCount: PropTypes.number.isRequired,
};
