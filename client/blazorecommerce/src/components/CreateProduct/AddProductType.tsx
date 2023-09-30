import {
    CategoryType,
    ProductTypesType,
    VariantType,
} from "@/src/utils/types.js";
import { Button, Checkbox, Label, Tooltip } from "flowbite-react";
import { CascadeSelect } from "primereact/cascadeselect";
import React from "react";
import { InputText } from "primereact/inputtext";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Toast } from "primereact/toast";

type Props = {
    variants: VariantType[] | null;
    setVariants: React.Dispatch<React.SetStateAction<VariantType[]>>;
    productTypes: ProductTypesType[];
    category: CategoryType;
    addingVariantData: () => void;
    createFlag: boolean;
};

const AddProductType = ({
    variants,
    setVariants,
    productTypes,
    category,
    createFlag,
}: Props) => {
    const [variantData, setVariantData] = React.useState<VariantType>({
        deleted: false,
        visible: true,
        originalPrice: 0,
        price: 0,
        productType: null,
    });
    const toast = React.useRef<Toast>(null);
    const [editFlag, setEditFlag] = React.useState<boolean>(false);

    const show = (
        severity: "success" | "info" | "warn" | "error" | undefined,
        summary: string,
        detail: string
    ) => {
        toast.current?.show({
            severity,
            summary,
            detail,
        });
    };
    function handleEdit(variant: VariantType) {
        setEditFlag(true);

        setVariants((prev) => [
            ...prev.filter(
                (v) => v.productType?.name != variant.productType?.name
            ),
        ]);
        setVariantData(variant);
    }

    function handleSave(): void {
        const check = variants?.find(
            (v) => v.productType?.name == variantData?.productType?.name
        );

        if (check) {
            show("error", "Error", "Product cannot have two same product type");
            return;
        }

        setVariants((prev) => [...prev, variantData!]);
        setVariantData({
            deleted: false,
            visible: true,
            originalPrice: 0,
            price: 0,
            productType: null,
        });
        if (editFlag) {
            show("success", "Success", "Success Editing");
            setEditFlag(false);
            return;
        }
        show("success", "Success", "Success Adding");
    }

    function cancel(): void {
        setVariantData({
            deleted: false,
            visible: true,
            originalPrice: 0,
            price: 0,
            productType: null,
        });
    }

    function remove(variant: VariantType): void {
        setVariants((prev) => [
            ...prev.filter(
                (v) => v.productType?.name != variant.productType?.name
            ),
        ]);
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="mt-3">
                {variants &&
                    variants.map((variant, index) => (
                        <div
                            className="flex gap-6 items-center mb-8"
                            key={index}
                        >
                            <span className="p-float-label">
                                <InputText
                                    id="productType"
                                    type="text"
                                    value={String(variant.productType?.name)}
                                    readOnly={true}
                                />
                                <label htmlFor="productType">
                                    Product Type
                                </label>
                            </span>
                            <span className="p-float-label">
                                <InputText
                                    id="price"
                                    type="number"
                                    value={String(variant.price)}
                                    readOnly={true}
                                />
                                <label htmlFor="price">Price</label>
                            </span>
                            <span className="p-float-label">
                                <InputText
                                    id="original-price"
                                    type="number"
                                    value={String(variant.originalPrice)}
                                    readOnly={true}
                                />
                                <label htmlFor="original-price">
                                    Original Price
                                </label>
                            </span>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="visible"
                                    defaultChecked={variant?.visible}
                                    disabled
                                />
                                <Label htmlFor="visible">Visible</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="deleted"
                                    defaultChecked={variant?.deleted}
                                    disabled
                                />
                                <Label htmlFor="deleted">Deleted</Label>
                            </div>

                            {/* Actions */}
                            <Tooltip content="Edit">
                                <Button
                                    gradientDuoTone="purpleToBlue"
                                    outline
                                    onClick={() => handleEdit(variant)}
                                >
                                    <FiEdit />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Remove">
                                <Button
                                    gradientDuoTone="pinkToOrange"
                                    outline
                                    onClick={() => remove(variant)}
                                >
                                    <BsFillTrashFill />
                                </Button>
                            </Tooltip>
                        </div>
                    ))}
            </div>
            <hr className="-mt-6" />
            {createFlag && (
                <div className="flex gap-6 items-center mt-3">
                    <CascadeSelect
                        optionGroupChildren={[]}
                        optionLabel="name"
                        options={productTypes.filter(
                            (pt) => pt.category?.name == category?.name
                        )}
                        onChange={(e) =>
                            setVariantData((prev) => ({
                                ...prev,
                                productType: e.value,
                            }))
                        }
                        value={variantData.productType?.name}
                        placeholder="Select Product Type"
                    />
                    <span className="p-float-label">
                        <InputText
                            id="price"
                            type="number"
                            value={String(variantData.price)}
                            onChange={(e) =>
                                setVariantData((prev) => ({
                                    ...prev,
                                    price: Number(e.target.value),
                                }))
                            }
                            min={0}
                        />
                        <label htmlFor="price">Price</label>
                    </span>
                    <span className="p-float-label">
                        <InputText
                            id="original-price"
                            type="number"
                            value={String(variantData.originalPrice)}
                            onChange={(e) =>
                                setVariantData((prev) => ({
                                    ...prev,
                                    originalPrice: Number(e.target.value),
                                }))
                            }
                            min={0}
                        />
                        <label htmlFor="original-price">Original Price</label>
                    </span>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="visible"
                            checked={variantData.visible}
                            onChange={(e) =>
                                setVariantData((prev) => ({
                                    ...prev,
                                    visible: Boolean(e.target.value),
                                }))
                            }
                        />
                        <Label htmlFor="visible">Visible</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="deleted"
                            checked={variantData.deleted}
                            onChange={(e) =>
                                setVariantData((prev) => ({
                                    ...prev,
                                    deleted: Boolean(e.target.value),
                                }))
                            }
                        />
                        <Label htmlFor="deleted">Deleted</Label>
                    </div>

                    {/* Actions */}
                    <Tooltip content="Save">
                        <Button
                            gradientDuoTone="greenToBlue"
                            outline
                            onClick={handleSave}
                        >
                            <AiOutlineCloudDownload />
                        </Button>
                    </Tooltip>

                    <Tooltip content="Cancel">
                        <Button
                            gradientDuoTone="pinkToOrange"
                            outline
                            onClick={cancel}
                        >
                            <BsFillTrashFill />
                        </Button>
                    </Tooltip>
                </div>
            )}
        </>
    );
};

export default AddProductType;
