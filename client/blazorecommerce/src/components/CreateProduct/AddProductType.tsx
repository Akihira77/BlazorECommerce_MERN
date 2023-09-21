import {
  CategoryType,
  ProductTypesType,
  VariantType,
} from "@/src/utils/types.js";
import { Button, Checkbox, Label } from "flowbite-react";
import {
  CascadeSelect,
  CascadeSelectChangeEvent,
} from "primereact/cascadeselect";
import React from "react";
import MyInputText from "./MyInputText.tsx";

type Props = {
  variants: VariantType[];
  productType: ProductTypesType | null;
  setProductType: React.Dispatch<React.SetStateAction<ProductTypesType | null>>;
  productTypes: ProductTypesType[];
  category: CategoryType | null;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  originalPrice: number;
  setOriginalPrice: React.Dispatch<React.SetStateAction<number>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  addingVariantData: () => void;
  remove: (id: number) => void;
};

const AddProductType = ({
  variants,
  productType,
  setProductType,
  productTypes,
  category,
  price,
  setPrice,
  originalPrice,
  setOriginalPrice,
  setDeleted,
  setVisible,
  addingVariantData,
  remove,
}: Props) => {
  return (
    variants.length > 0 &&
    variants.map((variant, index) => (
      <div className="mt-2 flex gap-4 items-center" key={index}>
        <span className="p-float-label">
          <CascadeSelect
            inputId="select-productType"
            value={productType?.name ?? variant.productType?.name}
            onChange={(e: CascadeSelectChangeEvent) => setProductType(e.value)}
            options={productTypes.filter(
              (productType) => productType.category._id == category?._id
            )}
            optionLabel="name"
            optionGroupChildren={[]}
            className="w-60"
          ></CascadeSelect>
          <label htmlFor="select-productType">Product Type</label>
        </span>
        <span className="p-float-label">
          <MyInputText
            data={variant}
            optionValue={price}
            setFn={setPrice}
            htmlFor="product-price"
            inputType="number"
            labelText="Price"
          />
        </span>
        <span className="p-float-label">
          <MyInputText
            data={variant}
            optionValue={originalPrice}
            setFn={setOriginalPrice}
            htmlFor="product-original-price"
            inputType="number"
            labelText="Original Price"
          />
        </span>
        <div className="status flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Checkbox
              id="visible"
              defaultChecked={variant.visible}
              onChange={(e) => setVisible(Boolean(e.target.value))}
            />
            <Label htmlFor="visible">Visible</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="visible"
              defaultChecked={variant.deleted}
              onChange={(e) => setDeleted(Boolean(e.target.value))}
            />
            <Label htmlFor="visible">Deleted</Label>
          </div>
        </div>
        <Button
          type="button"
          onClick={addingVariantData}
          gradientDuoTone="purpleToBlue"
          outline
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={() => remove(variant.id!)}
          gradientDuoTone="pinkToOrange"
          outline
        >
          Remove
        </Button>
      </div>
    ))
  );
};

export default AddProductType;
