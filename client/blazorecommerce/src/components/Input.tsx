import * as Form from "@radix-ui/react-form";
import React from "react";

type Props = {
  inputTypeName: string;
  labelText: string;
  handlerSet: React.Dispatch<React.SetStateAction<string>>;
  styled?: object;
};

const Input = ({ inputTypeName, labelText, handlerSet, styled }: Props) => {
  return (
    <Form.Field name={inputTypeName} style={styled}>
      <Form.Label htmlFor={labelText}>
        {labelText[0].toUpperCase() + labelText.slice(1)}
      </Form.Label>
      <Form.Control
        type={inputTypeName}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        id={labelText}
        onChange={(e) => handlerSet(e.target.value)}
        required
      />
      <Form.Message
        match={"valueMissing"}
        style={{ fontSize: ".8rem", color: "red" }}
      >
        Please enter your {labelText}
      </Form.Message>
    </Form.Field>
  );
};

export default Input;
