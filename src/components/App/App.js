import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductList from '../Product/ProductList';
import ProductDetails from '../Product/ProductDetails';
import Cart from '../Cart/Cart';
import PageMain from '../Page/PageMain';
import PageSuccess from '../Page/PageSuccess';
import PageError from '../Page/PageError';
import AppMobile from './AppMobile';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../Sidebar/Sidebar';
import { getProducts } from '../../redux/actions/storeActions';
import { getTotals, getDiscount } from '../../redux/actions/cartActions';
import {
  startUserSession,
  getQualifications,
} from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'voucherify.js';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty } from '../../redux/utils';
import has from 'lodash';
import SelectCustomerModal from '../SelectCustomerModal';

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName:
    'text-xl text-white bg-dark text-center p-3 shadow-none capitalize',
  progressClassName: 'bg-white opacity-25',
  closeButton: false,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
};

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
    dispatch(getProducts());
    dispatch(startUserSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, discount, items]);

  useEffect(() => {
    if (!isEmpty(discount) && !has(discount, 'code')) {
      dispatch(getDiscount(discount.code));
    }
  }, [dispatch, items, paymentMethod, discount]);

  useEffect(() => {
    if (!isEmpty(currentCustomer)) {
      dispatch(getQualifications());
    }
  }, [dispatch, currentCustomer, paymentMethod, items]);

  return (
    <>
      <div className="d-none d-md-block">
        {currentCustomer === null && (
          <SelectCustomerModal show={!Boolean(currentCustomer)} />
        )}
        <div
          className={currentCustomer === null ? 'isLoaded no' : 'isLoaded yes'}
        >
          <div
            className={enableSidebar ? 'd-flex' : 'd-flex toggled'}
            id="wrapper"
          >
            <div id="page-content-wrapper">
              <div className="mainContent">
                <Navigation />
                <Switch>
                  <Route exact path="/" component={PageMain} />
                  <Route path="/store" component={ProductList} />
                  <Route
                    path="/details/:productId"
                    component={ProductDetails}
                  />
                  <Route path="/cart" component={Cart} />
                  <Route path="/success" component={PageSuccess} />
                  <Route component={PageError} />
                </Switch>
                <Footer />
                <ToastContainer {...toastOptions} />
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
        )
      </div>
      <AppMobile />
    </>
  );
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
