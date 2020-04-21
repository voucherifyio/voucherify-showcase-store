import React, { Component } from 'react'
import {ProductConsumer} from '../Context'

export default class CartFrom extends React.Component {
    constructor(props) {
      super(props);
      this.state = {couponCode: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({couponCode: event.target.value});
    }
    
    render() {
      return (
        <ProductConsumer>
          {ctx => {

            return (
            <div className="col-lg-6">
              <form onSubmit={() => ctx.addPromotionToCart(this.state.couponCode)}>
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                    <div className="p-4">
                        <div className="d-flex" style={{"flexDirection": "column"}}>
                            <div className="input-group mb-4 border rounded-pill p-2">
                              <input type="text" placeholder="Apply coupon" name="couponCode" value={this.state.value} onChange={this.handleChange} aria-describedby="button-addon3" class="form-control border-0"/>
                            </div>
                            <button id="button-addon3" type="submit" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
                          </div>
                        </div>
                      </form>
                    </div>
            )
          }
        }
        </ProductConsumer>
      );
    }
  }
  