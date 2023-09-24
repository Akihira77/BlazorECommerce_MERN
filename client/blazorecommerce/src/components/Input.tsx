import { TextInput } from "flowbite-react";
import React from "react";

type Props = {
  inputTypeName: string;
  labelText: string;
  handlerSet?: React.Dispatch<React.SetStateAction<string>>;
  styled?: object;
  defaultValue?: unknown;
  readOnly: boolean;
};

const Input = ({
  inputTypeName,
  labelText,
  handlerSet,
  styled,
  defaultValue,
  readOnly = false,
}: Props) => {
  return (
    <div id={inputTypeName} style={styled}>
      <label htmlFor={labelText}>
        {labelText[0].toUpperCase() + labelText.slice(1)}
      </label>
      <TextInput
        type={inputTypeName}
        id={labelText}
        onChange={(e) => handlerSet!(e.target.value)}
        required
        defaultValue={defaultValue as string}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Input;
