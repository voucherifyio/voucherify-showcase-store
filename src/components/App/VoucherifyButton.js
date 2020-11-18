import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

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

	if (specialText && code && !tooltip) {
		return (
			<Button
				className="voucherifyButtonOrange"
				onClick={() => {
					navigator.clipboard.writeText(code);
					handleTooltipTitle();
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

export default React.memo(VoucherifyButton);

VoucherifyButton.propTypes = {
	code: PropTypes.string,
	text: PropTypes.string,
	onClickFunction: PropTypes.func,
};
