import React from "react";
import { BsCartCheck } from "react-icons/bs";

type Props = {};

const Cart = (props: Props) => {
  return (
    <button type="button" className="btn btn-outline-primary position-relative">
      <BsCartCheck />
      <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" />
      <span className="visually-hidden">New alerts</span>
    </button>
  );
};

export default Cart;
