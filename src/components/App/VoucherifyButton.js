import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const VoucherifyButton = ({
	code,
	text,
	onClickFunction,
	specialText,
	tooltip,
}) => {
	const [currentText, setCurrentText] = useState(text || null);
	const [tooltipTitle, setTitle] = useState('Click to copy');

	const handleTooltipTitle = () => {
		setTitle('Copied!');
		setTimeout(() => {
			setTitle('Click to copy');
		}, 400);
	};

	const handleChangeText = () => {
		setCurrentText(code);
	};

	if ((specialText && code && !tooltip) || (code && !tooltip)) {
		return (
			<Button
				className="voucherifyButtonOrange"
				onClick={() => {
					navigator.clipboard.writeText(code);
					handleChangeText();
				}}
			>
				{currentText}
			</Button>
		);
	} else if (code) {
		return (
			<Tooltip title={tooltipTitle}>
				<Button
					className="voucherifyButtonOrange"
					onClick={() => {
						navigator.clipboard.writeText(code);
						handleTooltipTitle();
						handleChangeText();
					}}
				>
					{!text ? `${code}` : `${currentText}`}
				</Button>
			</Tooltip>
		);
	} else if (onClickFunction) {
		return (
			<Button className="voucherifyButtonOrange" onClick={onClickFunction}>
				{text}
			</Button>
		);
	} else {
		return <Button className="voucherifyButtonOrange">{text}</Button>;
	}
};

export default VoucherifyButton;

VoucherifyButton.propTypes = {
	code: PropTypes.string,
	text: PropTypes.string,
	onClickFunction: PropTypes.func,
};
