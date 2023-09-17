import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { TextInput } from "flowbite-react";

type Props = {};

const Search = (props: Props) => {
  return (
    <TextInput
      color={"info"}
      className="basis-full"
      icon={PiMagnifyingGlass}
      placeholder="Search the products…"
    />
  );
};

export default Search;
