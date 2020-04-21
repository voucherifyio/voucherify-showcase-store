import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation'
import ProductList from './components/ProductList'
import Cart from './components/Cart/Cart'
import Default from './components/Default'
import Details from './components/Details'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import Modal from './components/Modal'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Switch>
        <Route exact path='/'component={MainPage}></Route>
          <Route path='/products' component={ProductList}></Route>
          <Route path='/details' component={Details}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
