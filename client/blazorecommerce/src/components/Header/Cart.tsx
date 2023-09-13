import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { Button } from "@radix-ui/themes";

type Props = {};

const Cart = (props: Props) => {
  return (
    <Button variant="surface" className="position-relative" size={"3"}>
      <BsCartCheck />
      <span
        className="position-absolute p-1 bg-danger border border-light rounded-circle"
        style={{ bottom: "22px", left: "30px" }}
      >
        <span className="visually-hidden">New alerts</span>
      </span>
    </Button>
  );
};

export default Cart;
