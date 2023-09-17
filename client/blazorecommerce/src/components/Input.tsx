import { TextInput } from "flowbite-react";
import React from "react";

type Props = {
  inputTypeName: string;
  labelText: string;
  handlerSet: React.Dispatch<React.SetStateAction<string>>;
  styled?: object;
};

const Input = ({ inputTypeName, labelText, handlerSet, styled }: Props) => {
  return (
    <div id={inputTypeName} style={styled}>
      <label htmlFor={labelText}>
        {labelText[0].toUpperCase() + labelText.slice(1)}
      </label>
      <TextInput
        type={inputTypeName}
        id={labelText}
        onChange={(e) => handlerSet(e.target.value)}
        required
      />
    </div>
  );
};

export default Input;
