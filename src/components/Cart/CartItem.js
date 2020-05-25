import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, count, total } = item;
  const { increment, decrement } = value;

  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">
          x{count} - {title}
        </h6>
        <small
          className="text-muted"
          onClick={() => increment(id)}
          style={{ cursor: "pointer" }}
        >
          <strong>Add</strong>
        </small>
        <small className="text-muted">&nbsp;/&nbsp;</small>
        <small
          className="text-muted"
          onClick={() => decrement(id)}
          style={{ cursor: "pointer" }}
        >
          <strong>Remove</strong>
        </small>
        <small className="text-muted">&nbsp;item&nbsp;</small>
      </div>
      <span className="text-muted">${total.toFixed(2)}</span>
    </li>
  );
}
