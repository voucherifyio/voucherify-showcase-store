import React, { useState } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';
import Row from 'react-bootstrap/Row';
import './style.css';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const Ribbon = ({ navigationRibbonVoucher }) => {
	const [tooltipTitle, setTitle] = useState('Click to copy');

	const handleTooltipTitle = () => {
		setTitle('Copied!');
		setTimeout(() => {
			setTitle('Click to copy');
		}, 400);
	};

	let ribbonDiscountText = '';
	let ribbonDiscountProduct = '';

	if (navigationRibbonVoucher.discount.type === 'PERCENT') {
		ribbonDiscountText = `${navigationRibbonVoucher.discount.percent_off}% off`;
	} else if (navigationRibbonVoucher.discount.type === 'AMOUNT') {
		ribbonDiscountText = `$${(
			navigationRibbonVoucher.discount.amount_off / 100
		).toFixed(2)} off`;
	}

	if (!_isEmpty(navigationRibbonVoucher.metadata.discount_suffix)) {
		ribbonDiscountProduct = ` for ${navigationRibbonVoucher.metadata.discount_suffix}`;
	}

	return (
		<Row noGutters={true} className="ribbonWrapper">
			<div className="ribbon">
				Use code{' '}
				<Tooltip title={tooltipTitle}>
					<span
						className="ribbonCode"
						onClick={() => {
							navigator.clipboard.writeText(navigationRibbonVoucher.code);
							handleTooltipTitle();
						}}
					>
						{navigationRibbonVoucher.code}
					</span>
				</Tooltip>{' '}
				to get {ribbonDiscountText}{' '}
				{ribbonDiscountProduct !== '' && { ribbonDiscountProduct }}
			</div>
		</Row>
	);
};

const mapStateToProps = (state) => {
	return {
		navigationRibbonVoucher: state.userReducer.navigationRibbonVoucher,
	};
};

export default connect(mapStateToProps)(Ribbon);

Ribbon.propTypes = {
	navigationRibbonVoucher: PropTypes.object,
};
