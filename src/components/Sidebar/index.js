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

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
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
              right: 'unset',
              backgroundColor: '#ff8b5c',
            },
          }}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Control panel"
          className="sidebarLabels"
        >
          <Tab
            // disabled
            className="voucherifyIcon"
            icon={<img src={VoucherifyLogoSquare} alt="" />}
            {...a11yProps(0)}
          />
          <Tab icon={<PersonIcon />} {...a11yProps(1)} />
          <Tab icon={<GroupIcon />} {...a11yProps(2)} />
          <Tab icon={<ShoppingCartIcon />} {...a11yProps(3)} />
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
