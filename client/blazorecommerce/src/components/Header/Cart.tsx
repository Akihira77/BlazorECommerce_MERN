import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { Button } from "@radix-ui/themes";

type Props = {};

const Cart = (props: Props) => {
  return (
    <Button variant="surface" className="relative" size={"3"}>
      <BsCartCheck />
      <span className="sr-only">Notifications</span>
      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 "></div>
    </Button>
  );
};

export default Cart;
