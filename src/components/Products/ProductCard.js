import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import _isEmpty from 'lodash.isempty';

const getProductCampaign = (campaigns, product) => {
	return campaigns.filter(
		(camp) => camp.metadata.promotion_product === product.name
	);
};

const DiscountBadge = withStyles(() => ({
	badge: {
		backgroundColor: 'var(--orange)',
		color: 'var(--white)',
		borderRadius: '5px',
		padding: '10px',
	},
}))(Badge);

const ProductCard = ({ product, addItemToCart, campaigns }) => {
	const handleAddItemToCart = () => {
		addItemToCart();
	};

	const productCampaigns = useMemo(
		() => getProductCampaign(campaigns, product),
		[campaigns, product]
	);

	return (
		<Col lg={4} md={6} sm={6} xs={12}>
			<div className="productCard">
				<Link to={`/details/${product.id}`}>
					<div>
						<DiscountBadge
							badgeContent="Sale"
							invisible={_isEmpty(productCampaigns)}
						>
							<img
								className="productCardImage"
								src={product.image_url}
								alt={product.name}
							/>
						</DiscountBadge>
					</div>
				</Link>
				<div className="productCardContent">
					{!_isEmpty(product.name.split('-')) ? (
						<>
							<h6 className="productCardTitle">{product.name.split('-')[0]}</h6>
							<h5 className="productCardTitle">{product.name.split('-')[1]}</h5>
						</>
					) : (
						<h5 className="productCardTitle">{product.name}</h5>
					)}

					<div className="productCardDetails">
						<Button
							onClick={handleAddItemToCart}
							className="voucherifyButtonDark"
						>
							${(product.price / 100).toFixed(2)} - Add to cart
						</Button>
					</div>
				</div>
			</div>
		</Col>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
	addItemToCart: PropTypes.func.isRequired,
	campaigns: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { product } = ownProps;
	return {
		addItemToCart: () =>
			dispatch(addItemToCart(product.id, 1, 'increment_count')),
	};
};

export default connect(null, mapDispatchToProps)(React.memo(ProductCard));
