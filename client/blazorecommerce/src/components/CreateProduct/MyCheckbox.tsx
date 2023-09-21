import { Checkbox, Label } from "flowbite-react";
import React from "react";

type Props = {
  defaultChecked: boolean;
  handlerSet: React.Dispatch<React.SetStateAction<boolean>>;
  htmlFor: string;
  labelText: string;
};

const MyCheckbox = ({
  defaultChecked,
  handlerSet,
  htmlFor,
  labelText,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={htmlFor}
        defaultChecked={defaultChecked}
        onChange={(e) => handlerSet(Boolean(e.target.value))}
      />
      <Label htmlFor={htmlFor}>{labelText}</Label>
    </div>
  );
};

export default MyCheckbox;
