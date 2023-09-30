import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import {
    CascadeSelect,
    CascadeSelectChangeEvent,
} from "primereact/cascadeselect";
import React from "react";
import {
    CategoryType,
    ErrorResponse,
    ProductType,
    ProductTypesType,
    ProductVariantsType,
    SuccessResponse,
    VariantType,
} from "../utils/types";
import AddProductType from "../components/CreateProduct/AddProductType.tsx";
import { postToApi } from "../utils/axiosCommand.ts";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { CategoryResultType } from "../components/Category/type.ts";
import { ProductTypeResultType } from "../components/ProductType/type.ts";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type Props = {};

const CreateProduct = (props: Props) => {
    const toast = React.useRef<Toast>(null);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [productTypes, setProductTypes] = React.useState<ProductTypesType[]>(
        []
    );
    const [productVariants, setProductVariants] =
        React.useState<ProductVariantsType>({
            title: "",
            description: "",
            imageUrl: "",
            visible: true,
            featured: false,
            deleted: false,
            category: null,
            variants: null,
        });
    const [variants, setVariants] = React.useState<VariantType[]>([]);
    const [createFlag, setCreateFlag] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["token"]);

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

    const addingVariantData = () => {
        show("success", "Success", "Product Type Saved");
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const productData: ProductType = {
            title: productVariants.title,
            imageUrl: productVariants.imageUrl,
            description: productVariants.description,
            deleted: productVariants.deleted,
            featured: productVariants.featured,
            variants: variants,
            visible: productVariants.visible,
            category: productVariants.category!,
        };

        const response = await postToApi("product", productData, cookies.token);
        const successResponse = response as SuccessResponse;
        const errorResponse = response as ErrorResponse;

        // console.log(response);
        if (successResponse.success) {
            show("success", "Success", successResponse.data.msg);
            navigate("/admin/product", { replace: true });
        } else {
            show("error", "Error", errorResponse.msg);
        }
    }

    const handleChangeCategory = (e: CascadeSelectChangeEvent) => {
        setProductVariants({
            ...productVariants,
            category: e.value,
        });
    };

    const categoriesFromBackend =
        useGetFromApi<CategoryResultType>("category")?.categories;
    const productTypeFromBackend =
        useGetFromApi<ProductTypeResultType>("product-type")?.productTypes;

    React.useEffect(() => {
        if (categoriesFromBackend) {
            setCategories(categoriesFromBackend);
        }

        if (productTypeFromBackend) {
            setProductTypes(productTypeFromBackend);
        }
    }, [categoriesFromBackend, productTypeFromBackend]);

    // console.log(productVariants);
    return (
        <div className="container my-8 flex flex-col">
            <h2 className="font-bold mb-4 text-2xl">Create New Product</h2>
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <label htmlFor="title">Title</label>
                    <TextInput
                        type="text"
                        id="title"
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                title: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image</label>
                    <TextInput
                        type="text"
                        id="imageUrl"
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                imageUrl: e.target.value,
                            })
                        }
                        required
                    />
                    {productVariants.imageUrl && (
                        <img
                            alt="product"
                            src={productVariants.imageUrl}
                            className="mt-6 max-w-[200px] mx-auto"
                        />
                    )}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea
                        id="description"
                        placeholder="Product description..."
                        required
                        rows={4}
                        className="p-2 rounded-md"
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="mt-2">
                    <span className="p-float-label">
                        <CascadeSelect
                            inputId="select-category"
                            value={productVariants.category}
                            onChange={(e: CascadeSelectChangeEvent) =>
                                handleChangeCategory(e)
                            }
                            options={categories}
                            optionLabel="name"
                            optionGroupChildren={[]}
                            className="md:w-20rem w-full"
                        ></CascadeSelect>
                        <label htmlFor="select-category">Category</label>
                    </span>
                </div>

                {/* Toast after insert Product Type/Variant Product */}
                <Toast ref={toast} />

                <AddProductType
                    variants={variants}
                    setVariants={setVariants}
                    addingVariantData={addingVariantData}
                    category={productVariants.category!}
                    productTypes={productTypes}
                    createFlag={createFlag}
                />
                {productVariants.category && !createFlag && (
                    <Button
                        onClick={() => setCreateFlag(true)}
                        gradientDuoTone="purpleToBlue"
                        outline
                    >
                        Add Product Type
                    </Button>
                )}
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="featured"
                        defaultChecked={productVariants.featured}
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                featured: Boolean(e.target.value),
                            })
                        }
                    />
                    <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="visible"
                        defaultChecked={productVariants.visible}
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                visible: Boolean(e.target.value),
                            })
                        }
                    />
                    <Label htmlFor="visible">Visible</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="deleted"
                        defaultChecked={productVariants.deleted}
                        onChange={(e) =>
                            setProductVariants({
                                ...productVariants,
                                deleted: Boolean(e.target.value),
                            })
                        }
                    />
                    <Label htmlFor="deleted">Deleted</Label>
                </div>
                <Button
                    className="mt-4"
                    type="submit"
                    gradientDuoTone="greenToBlue"
                    outline
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateProduct;
