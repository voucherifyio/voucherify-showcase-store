import React, { useState, useEffect } from 'react';
import SidebarPersonalDiscounts from './SidebarPersonalDiscounts';
import SidebarPublicDiscounts from './SidebarPublicDiscounts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SidebarCartDiscounts from './SidebarCartDiscounts';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './style.css';
import { connect } from 'react-redux';
import { setEnableSidebar } from '../../redux/actions/userActions';
import VoucherifyLogoSquare from '../../assets/VoucherifyLogoSquare.png';
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';
import GitHubIcon from '@material-ui/icons/GitHub';
import PropTypes from 'prop-types';

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

const Sidebar = ({ enableSidebar, dispatch }) => {
  const [toggle, setToggle] = useState(enableSidebar);
  const [value, setValue] = useState(1);

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
    } else if (newValue > 3) {
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
              right: 'unset',
              width: '4px',
              backgroundColor: 'var(--orange)',
            },
          }}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Control panel"
          className="sidebarLabels"
        >
          <Tooltip title="Close sidebar">
            <Tab
              className="voucherifyIcon"
              icon={<img src={VoucherifyLogoSquare} alt="" />}
              {...a11yProps(0)}
            />
          </Tooltip>
          <Tooltip title="Check personal discounts">
            <Tab icon={<PersonIcon />} {...a11yProps(1)} />
          </Tooltip>
          <Tooltip title="Check public discounts">
            <Tab icon={<GroupIcon />} {...a11yProps(2)} />
          </Tooltip>
          <Tooltip title="Check cart discounts">
            <Tab icon={<ShoppingCartIcon />} {...a11yProps(3)} />
          </Tooltip>
          <Tooltip title="Check documentation">
            <Tab
              className="tabLinks"
              component="a"
              href="https://github.com/voucherifyio/voucherify-showcase-store"
              icon={<GitHubIcon />}
            />
          </Tooltip>
          <Tooltip title="Deploy">
            <Tab
              component="a"
              href="https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fgithub.com%2F&template=https%3A%2F%2Fgithub.com%2Fvoucherifyio%2Fvoucherify-showcase-store%2F"
              icon={<LaunchIcon />}
            />
          </Tooltip>
        </Tabs>
        <TabPanel value={value} index={1}>
          <SidebarPersonalDiscounts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SidebarPublicDiscounts />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SidebarCartDiscounts />
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    enableSidebar: state.userReducer.enableSidebar,
  };
};

export default connect(mapStateToProps)(Sidebar);

Sidebar.propTypes = {
  enableSidebar: PropTypes.bool,
  dispatch: PropTypes.func,
};
