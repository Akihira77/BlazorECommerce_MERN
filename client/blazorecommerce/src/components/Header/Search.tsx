import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

type Props = {};

const Search = (props: Props) => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">
          <PiMagnifyingGlass />
        </span>
        <input className="form-control" type="text" placeholder="Search..." />
      </div>
    </>
  );
};

export default Search;
