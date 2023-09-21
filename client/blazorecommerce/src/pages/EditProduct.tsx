import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const EditProduct = (props: Props) => {
  const params = useParams();
  console.log(params);
  return <div>EditProduct</div>;
};

export default EditProduct;
