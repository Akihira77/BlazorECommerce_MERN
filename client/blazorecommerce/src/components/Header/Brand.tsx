import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Brand = (props: Props) => {
  return (
    <Link
      color="primary"
      className="btn btn-outline-primary d-flex align-items-center gap-2 py-0"
      style={{ transform: "rotate(-2deg)" }}
      to={"/"}
    >
      <img
        src="https://res.cloudinary.com/duthytmqy/image/upload/v1682229266/bec-high-resolution-logo-color-on-transparent-background_mnb8ph.png"
        alt="brand"
        className=""
        style={{ width: "40px" }}
      />
      <span>BlazorECommerce</span>
    </Link>
  );
};

export default Brand;
