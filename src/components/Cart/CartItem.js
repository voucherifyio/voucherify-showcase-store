import React from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, value }) {
  const { id, title, img, price, count, total } = item;
  const { increment, decrement, removeItem } = value;

  const moreThenOne = () => {
    if (count > 1) {
      return <small className='font-italic'>Each for ${price}</small>;
    }
  };

  return (
    <div className='row mb-4' id={id}>
      <div className='col d-none d-lg-flex align-items-center'>
        <Link to='/details'>
          <img
            src={img}
            alt=''
            width='70'
            className='img-fluid rounded shadow-sm '
            onClick={() => value.handleDetail(id)}
          />
        </Link>
      </div>
      <div className='col-8 col-md-6 d-flex align-items-center'>
        <h5 className='mb-0 text-dark d-inline-block align-middle'>{title}</h5>
      </div>
      <div className='col d-none d-lg-flex align-items-center'>
        <strong>
          <span
            className='fas fa-plus mx-1'
            onClick={() => increment(id)}
            style={{ cursor: 'pointer' }}
          ></span>
          <span className='px-2'>{count}</span>
          <span
            className='fas fa-minus mx-1'
            onClick={() => decrement(id)}
            style={{ cursor: 'pointer' }}
          ></span>
        </strong>
      </div>
      <div className='col d-flex align-items-center'>
        <div className='my-auto'>
          <div className='text-center d-flex'>
            <strong>${total}</strong>
          </div>
          <div className='text-center d-none d-lg-flex'>{moreThenOne()}</div>
        </div>
      </div>
      <div className='col d-none d-lg-flex align-items-center'>
        <i
          className='fas fa-times'
          onClick={() => removeItem(id)}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
    </div>
  );
}
