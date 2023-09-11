import React from "react";

type Props = {
  type: string;
  className: string;
  id: string;
};

const Input = ({ type, id, className }: Props) => {
  return <input type={type} className={className} id={id} />;
};

export default Input;
