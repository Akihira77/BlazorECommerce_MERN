import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { TextField } from "@radix-ui/themes";

type Props = {};

const Search = (props: Props) => {
  return (
    <TextField.Root size={"3"} style={{ width: "70%" }}>
      <TextField.Slot>
        <PiMagnifyingGlass />
      </TextField.Slot>
      <TextField.Input placeholder="Search the products…" variant="surface" />
    </TextField.Root>
  );
};

export default Search;
