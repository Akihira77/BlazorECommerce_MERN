import { Button, Label, TextInput, Textarea, Checkbox } from "flowbite-react";
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
    SuccessResponse,
    ToastType,
    VariantType,
} from "../utils/types";
import AddProductType from "../components/CreateProduct/AddProductType.tsx";
import { putToApi } from "../utils/axiosCommand.ts";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { CategoryResultType } from "../components/Category/type.ts";
import { ProductTypeResultType } from "../components/ProductType/type.ts";
import { Toast } from "primereact/toast";
import { StatusCodes } from "../utils/constant.ts";
import { useNavigate, useParams } from "react-router-dom";
import { ProductResultType } from "../components/Product/type.ts";
import { Dialog } from "primereact/dialog";
import { useCookies } from "react-cookie";
// import { Checkbox } from "primereact/checkbox";

type Props = {};

const EditProduct = (props: Props) => {
    const navigate = useNavigate();
    const params = useParams();
    const toast = React.useRef<Toast>(null);
    const [product, setProduct] = React.useState<ProductType>();
    const [variants, setVariants] = React.useState<VariantType[]>([]);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [productTypes, setProductTypes] = React.useState<ProductTypesType[]>(
        []
    );
    const [cookies, setCookies] = useCookies(["token"]);

    const show = (severity: ToastType, summary: string, detail: string) => {
        toast.current?.show({
            severity,
            summary,
            detail,
        });
    };

    const addingVariantData = () => {
        show("success", "Success", "Product Type Saved");
    };

    const footerContent = (
        <div className="flex gap-4 justify-end">
            <Button
                onClick={() => setVisible(false)}
                gradientMonochrome="failure"
            >
                Cancel
            </Button>
            <Button
                onClick={() => handleSubmit()}
                autoFocus
                gradientMonochrome="teal"
            >
                Confirm
            </Button>
        </div>
    );

    async function handleSubmit() {
        const productData: ProductType = {
            _id: product!._id,
            title: product!.title,
            imageUrl: product!.imageUrl,
            description: product!.description,
            deleted: product!.deleted,
            featured: product!.featured,
            variants: variants,
            visible: product!.visible,
            category: product!.category,
        };

        // console.log(productData);
        const response = await putToApi(
            "product",
            productData!._id!,
            productData,
            cookies.token
        );
        const successResponse = response as SuccessResponse;
        const errorResponse = response as ErrorResponse;
        console.log(response);
        if (successResponse.success) {
            show("success", "Success", successResponse.data.msg);
            navigate("/admin/product", { replace: true });
        } else {
            show("error", "Error", errorResponse.msg);
        }
    }

    const handleChangeCategory = (e: CascadeSelectChangeEvent) => {
        setVariants([]);
        setProduct({
            ...product!,
            category: e.value,
            variants: [],
        });
    };

    const categoriesFromBackend =
        useGetFromApi<CategoryResultType>("category")?.categories;
    const productTypeFromBackend =
        useGetFromApi<ProductTypeResultType>("product-type")?.productTypes;
    const productFromBackend = useGetFromApi<ProductResultType>(
        `product/${params.id}`
    )?.product;

    React.useEffect(() => {
        if (productFromBackend) {
            setVariants(productFromBackend.variants);
            setProduct(productFromBackend);
        }

        if (categoriesFromBackend) {
            setCategories(categoriesFromBackend);
        }

        if (productTypeFromBackend) {
            setProductTypes(productTypeFromBackend);
        }
    }, [categoriesFromBackend, productTypeFromBackend, productFromBackend]);

    return (
        <>
            {product && (
                <div className="container my-8 flex flex-col">
                    <h2 className="font-bold mb-4 text-2xl">Edit Product</h2>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault(), setVisible(true);
                        }}
                    >
                        <div>
                            <label htmlFor="title">Title</label>
                            <TextInput
                                type="text"
                                id="title"
                                value={product.title}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
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
                                value={product.imageUrl}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        imageUrl: e.target.value,
                                    })
                                }
                                required
                            />
                            {product.imageUrl && (
                                <img
                                    alt="product"
                                    src={product.imageUrl}
                                    className="mt-6 max-w-[200px] mx-auto"
                                />
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Description"
                                />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Product description..."
                                required
                                rows={4}
                                className="p-2 rounded-md"
                                value={product.description}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mt-2">
                            <span className="p-float-label">
                                <CascadeSelect
                                    inputId="select-category"
                                    value={product.category}
                                    onChange={(e: CascadeSelectChangeEvent) =>
                                        handleChangeCategory(e)
                                    }
                                    options={categories}
                                    optionLabel="name"
                                    optionGroupChildren={[]}
                                    className="md:w-20rem w-full"
                                ></CascadeSelect>
                                <label htmlFor="select-category">
                                    Category
                                </label>
                            </span>
                        </div>

                        {product.category && (
                            <AddProductType
                                variants={variants}
                                setVariants={setVariants}
                                addingVariantData={addingVariantData}
                                category={product.category}
                                productTypes={productTypes}
                                createFlag={true}
                            />
                        )}

                        {/* Toast after insert Product Type/Variant Product */}
                        <Toast ref={toast} />

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="featured"
                                checked={product.featured}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        featured: e.target.checked,
                                    })
                                }
                            />
                            <Label htmlFor="featured">Featured</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="visible"
                                checked={product.visible}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        visible: e.target.checked,
                                    })
                                }
                            />
                            <Label htmlFor="visible">Visible</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="deleted"
                                checked={product.deleted}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        deleted: e.target.checked,
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
                            Save
                        </Button>
                    </form>
                </div>
            )}
            <Dialog
                header="Confirmation"
                visible={visible}
                className="w-[50vw] text-center"
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <p className="m-0">Confirm Update</p>
            </Dialog>
        </>
    );
};

export default EditProduct;
