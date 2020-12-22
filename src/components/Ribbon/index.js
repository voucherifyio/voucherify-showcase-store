import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';
import Row from 'react-bootstrap/Row';
import './style.css';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const Ribbon = ({ vouchers }) => {
	const [tooltipTitle, setTitle] = useState('Click to copy');
	const [voucher, setVoucher] = useState({});

	useEffect(() => {
		if (!_isEmpty(vouchers)) {
			const navigationRibbonVoucher = vouchers.find(
				(voucher) => voucher.code === '50%OFF'
			);

			let ribbonDiscountText = '';

			if (navigationRibbonVoucher.discount.type === 'PERCENT') {
				ribbonDiscountText = `${navigationRibbonVoucher.discount.percent_off}% off`;
			} else if (navigationRibbonVoucher.discount.type === 'AMOUNT') {
				ribbonDiscountText = `$${(
					navigationRibbonVoucher.discount.amount_off / 100
				).toFixed(2)} off`;
			}

			if (!_isEmpty(navigationRibbonVoucher.metadata.discount_suffix)) {
				ribbonDiscountText += ` for ${navigationRibbonVoucher.metadata.discount_suffix}`;
			}

			setVoucher({
				code: navigationRibbonVoucher.code,
				text: ribbonDiscountText,
			});
		}
	}, [vouchers]);

	const handleTooltipTitle = () => {
		setTitle('Copied!');
		setTimeout(() => {
			setTitle('Click to copy');
		}, 400);
	};

	if (!_isEmpty(voucher)) {
		return (
			<Row noGutters={true} className="ribbonWrapper">
				<div className="ribbon">
					Use code{' '}
					<Tooltip title={tooltipTitle}>
						<span
							className="ribbonCode"
							onClick={() => {
								navigator.clipboard.writeText(voucher.code);
								handleTooltipTitle();
							}}
						>
							{voucher.code}
						</span>
					</Tooltip>{' '}
					to get {voucher.text}
				</div>
			</Row>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		vouchers: state.userReducer.vouchers,
	};
};

export default connect(mapStateToProps)(Ribbon);

Ribbon.propTypes = {
	vouchers: PropTypes.array,
};
