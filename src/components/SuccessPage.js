import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SuccessPage extends Component {
  render() {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col my-5'>
            <div>
              <h1 className='text-center'>Order completed</h1>
              <h2 className='text-center'>Thank you for your order!</h2>
              <div className='text-center mb-5'>
                ID: 433dd1b3-5433-400d-82e5-82812ecd1cd3
              </div>
              <Link
                to='/store'
                className='inline-block btn btn-outline-secondary'
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
