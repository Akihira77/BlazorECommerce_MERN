import React from "react";
import Brand from "../components/Header/Brand.tsx";
import Search from "../components/Header/Search.tsx";
import UserButton from "../components/Header/UserButton.tsx";
import Cart from "../components/Header/Cart.tsx";

type Props = {};

const Header = (props: Props) => {
  return (
    <div
      style={{
        height: "65px",
        borderBottom: "2px solid #ddd",
      }}
      className="d-flex align-items-center gap-4 px-5 container-fluid"
    >
      <Brand />
      <Search />
      <div className="d-flex gap-3 align-items-center">
        <Cart />
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
