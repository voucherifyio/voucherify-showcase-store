import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../HotBeansLogo.svg'
import {ProductConsumer} from './Context'

export default class Navbar extends Component {
    render() {
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                Hot Beans
              </Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">Store</Link>
              </li>
            </ul>
            <Link to="/cart">
              <button className="btn btn-sm btn-outline-secondary" type="button">Cart&nbsp;
                <ProductConsumer>
                  {value => {
                      const {cart} = value;
                      if (cart.length > 0 ){
                          return (
                              <span class="badge badge-pill badge-warning">{cart.length}</span>
                            );
                      } 
                    }}
                </ProductConsumer>
              </button>
            </Link>
          </div>
        </nav>
        )
    }
}
