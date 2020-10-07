import React, { useEffect } from 'react';
import CustomersModal from '../CustomersModal';
import Navigation from '../Navigation';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../Sidebar';
import Ribbon from '../Ribbon';
import { getProducts } from '../../redux/actions/storeActions';
import { getTotals, getDiscount } from '../../redux/actions/cartActions';
import {
  startUserSession,
  getQualifications,
  checkVersion,
} from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _has from 'lodash.has';
import _isEmpty from 'lodash.isempty';
import toastOptions from './ToastOptions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'voucherify.js';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

window.Voucherify.initialize(
  process.env.REACT_APP_FRONTEND_APP_ID,
  process.env.REACT_APP_FRONTEND_KEY
);

const App = ({
  dispatch,
  items,
  discount,
  paymentMethod,
  currentCustomer,
  enableSidebar,
}) => {
  useEffect(() => {
    const startSession = async () => {
      await dispatch(checkVersion());
      await dispatch(startUserSession());
      await dispatch(getProducts());
    };
    startSession();
  }, [dispatch]);

  useEffect(() => {
    if (!_isEmpty(currentCustomer)) {
      dispatch(getTotals());
    }
  }, [currentCustomer, dispatch, discount, items]);

  useEffect(() => {
    if (!_isEmpty(discount) && !_has(discount, 'code')) {
      dispatch(getDiscount(discount.code));
    }
  }, [dispatch, items, paymentMethod, discount]);

  useEffect(() => {
    if (!_isEmpty(currentCustomer)) {
      dispatch(getQualifications());
    }
  }, [dispatch, currentCustomer, paymentMethod, items]);
  if (currentCustomer === null) {
    return <CustomersModal />;
  } else {
    return (
      <div className={enableSidebar ? 'mainContent' : 'mainContent sidebar'}>
        <Ribbon />
        <Container>
          <Navigation />
          <Row noGutters className="pageContainer">
            <AppRoutes />
          </Row>
          <ToastContainer {...toastOptions} />
        </Container>
        <Sidebar />
      </div>
    );
  }
  // return (
  //   <>
  //     {currentCustomer === null ? (
  //       <CustomersModal />
  //     ) : (
  //       <div className={enableSidebar ? 'mainContent' : 'mainContent sidebar'}>
  //         <Ribbon />
  //         <Container>
  //           <Navigation />
  //           <Row noGutters className="pageContainer">
  //             <AppRoutes />
  //           </Row>
  //           <ToastContainer {...toastOptions} />
  //         </Container>
  //         <Sidebar />
  //       </div>
  //     )}
  //   </>
  // );
};

const mapStateToProps = (state) => {
  return {
    products: state.storeReducer.products,
    items: state.cartReducer.items,
    currentCustomer: state.userReducer.currentCustomer,
    discount: state.cartReducer.discount,
    paymentMethod: state.userReducer.paymentMethod,
    enableSidebar: state.userReducer.enableSidebar,
  };
};

App.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array,
  currentCustomer: PropTypes.object,
  discount: PropTypes.object,
  paymentMethod: PropTypes.string,
  enableSidebar: PropTypes.bool,
};

export default connect(mapStateToProps)(App);
