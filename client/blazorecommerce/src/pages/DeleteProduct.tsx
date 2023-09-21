import React from "react";

type Props = {};

const DeleteProduct = (props: Props) => {
  const params = useParams();
  console.log(params);
  return <div>DeleteProduct</div>;
};

export default DeleteProduct;
