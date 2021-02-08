import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import './style.css';
import { connect } from 'react-redux';
import { setEnableSidebar } from '../../redux/actions/userActions';
import VoucherifyLogoSquare from '../../assets/VoucherifyLogoSquare.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';
import GitHubIcon from '@material-ui/icons/GitHub';
import PropTypes from 'prop-types';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@material-ui/core';
import formatHighlight from 'json-format-highlight';

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			className="sidebarTab"
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.object,
	value: PropTypes.number,
	index: PropTypes.number,
};

const Sidebar = ({
	enableSidebar,
	dispatch,
	apiCall,
	apiResponse,
	apiCallResponse,
}) => {
	const [toggle, setToggle] = useState(enableSidebar);
	const [value, setValue] = useState(1);
	const [expanded, setExpanded] = useState('');
	const handleTabChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleToggleSidebar = () => {
		setToggle(!toggle);
	};

	useEffect(() => {
		dispatch(setEnableSidebar(toggle));
	}, [dispatch, toggle]);

	const a11yProps = (index) => {
		if (index === value) {
			return {
				id: `vertical-tab-${index}`,
				'aria-controls': `vertical-tabpanel-${index}`,
				className: 'currentTab',
			};
		} else {
			return {
				id: `vertical-tab-${index}`,
				'aria-controls': `vertical-tabpanel-${index}`,
			};
		}
	};

	const handleChange = (event, newValue) => {
		if (newValue === 0) {
			handleToggleSidebar();
		} else if (enableSidebar === false) {
			handleToggleSidebar();
			setValue(newValue);
		} else {
			setValue(newValue);
		}
	};
	return (
		<div className="sidebarWrapper">
			<div className="sidebarContentWrapper">
				<Tabs
					TabIndicatorProps={{
						style: {
							display: 'none',
							right: 'unset',
							width: '4px',
							backgroundColor: 'var(--orange)',
						},
					}}
					orientation="vertical"
					value={0}
					onChange={handleChange}
					aria-label="Control panel"
					className="sidebarLabels"
				>
					<Tooltip title="Close sidebar">
						<Tab
							className="voucherifyIcon"
							icon={<img src={VoucherifyLogoSquare} width="24px" alt="" />}
							{...a11yProps(0)}
						/>
					</Tooltip>

					<div className="tabLinks tabIcon">
						<Tooltip title="Check documentation">
							<a href="https://github.com/voucherifyio/voucherify-showcase-store">
								<IconButton>
									<GitHubIcon />
								</IconButton>
							</a>
						</Tooltip>
					</div>
					<div className="tabIcon">
						<Tooltip title="Deploy">
							<a href="https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2F&template=https%3A%2F%2Fgithub.com%2Fvoucherifyio%2Fvoucherify-showcase-store%2F">
								<IconButton>
									<LaunchIcon />
								</IconButton>
							</a>
						</Tooltip>
					</div>
				</Tabs>
				<TabPanel value={value} index={1}>
					<div className="voucherifyApi">Voucherify API</div>
					{/* <Accordion
						square
						key={'api-request'}
						expanded={expanded === 'api-request'}
						onChange={handleTabChange('api-request')}
						className={
							expanded === 'api-request'
								? 'accordionBackground open'
								: 'accordionBackground'
						}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="api-request"
							id="api-request"
						>
							<p className="accordionTitle">Request</p>&nbsp;
							<CallMadeIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</AccordionSummary>
						<AccordionDetails>
							<div className="apiBlock">
								<pre style={{ whiteSpace: 'break-spaces' }}>
									{apiCall ? (
										<code
											dangerouslySetInnerHTML={{
												__html: formatHighlight(apiCall),
											}}
										/>
									) : (
										<code>No api request yet</code>
									)}
								</pre>
							</div>
						</AccordionDetails>
					</Accordion> */}
					{apiCallResponse.map((callOrResponse, index) => {
						return (
							<Accordion
								square
								key={`api-data-${index}`}
								expanded={expanded === `api-data-${index}`}
								onChange={handleTabChange(`api-data-${index}`)}
								className={
									expanded === `api-data-${index}`
										? 'accordionBackground open'
										: 'accordionBackground'
								}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls={`api-response-${index}`}
									id={`api-response-${index}`}
								>
									<p className="accordionTitle">{callOrResponse.type}</p>&nbsp;
									{callOrResponse.type === 'Response' ? (
										<CallReceivedIcon
											style={{ color: 'rgba(0, 0, 0, 0.54)' }}
										/>
									) : (
										<CallMadeIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
									)}
								</AccordionSummary>
								<AccordionDetails>
									<div className="apiBlock">
										<pre style={{ whiteSpace: 'break-spaces' }}>
											{callOrResponse ? (
												<code
													dangerouslySetInnerHTML={{
														__html: formatHighlight(callOrResponse.data),
													}}
												/>
											) : (
												<code>
													No api {callOrResponse.type.toLowerCase()} yet
												</code>
											)}
										</pre>
									</div>
								</AccordionDetails>
							</Accordion>
						);
					})}
				</TabPanel>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		enableSidebar: state.userReducer.enableSidebar,
		apiCall: state.userReducer.apiCall,
		apiResponse: state.userReducer.apiResponse,
		apiCallResponse: state.userReducer.apiCallResponse,
	};
};

export default connect(mapStateToProps)(Sidebar);

Sidebar.propTypes = {
	enableSidebar: PropTypes.bool,
	dispatch: PropTypes.func,
};
