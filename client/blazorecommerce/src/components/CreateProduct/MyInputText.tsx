import { VariantType } from "@/src/utils/types.js";
import { InputText } from "primereact/inputtext";
import React from "react";

type Props = {
    data: VariantType;
    optionValue: unknown;
    setFn: (value: React.SetStateAction<any>) => void;
    labelText: string;
    htmlFor: string;
    inputType: string;
    readonly?: boolean;
};

const MyInputText = ({
    data,
    optionValue,
    setFn,
    labelText,
    inputType,
    htmlFor,
    readonly,
}: Props) => {
    function checkingWhatObject(obj: string): string {
        let result = String(optionValue);
        if (obj === "product-price" && data.price != 0) {
            result = data.price.toString();
        } else if (
            obj === "product-original-price" &&
            data.originalPrice != 0
        ) {
            result = data.originalPrice.toString();
        }

        return result;
    }
    return (
        <>
            <InputText
                id={htmlFor}
                required
                type={inputType}
                value={checkingWhatObject(htmlFor)}
                onChange={(e) => {
                    setFn(Number(e.target.value));
                }}
                readOnly={readonly}
            />
            <label htmlFor={htmlFor}>{labelText}</label>
        </>
    );
};

export default MyInputText;
