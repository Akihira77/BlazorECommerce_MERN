import { Button, Label, Textarea } from "flowbite-react";
import {
  CascadeSelect,
  CascadeSelectChangeEvent,
} from "primereact/cascadeselect";
import React from "react";
import {
  CategoryType,
  ProductType,
  ProductTypesType,
  VariantType,
} from "../utils/types";
import Input from "../components/Input.tsx";
import AddProductType from "../components/CreateProduct/AddProductType.tsx";
import MyCheckbox from "../components/CreateProduct/MyCheckbox.tsx";
import { postToApi } from "../utils/axiosCommand.ts";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { CategoryResultType } from "../components/Category/type.ts";
import { ProductTypeResultType } from "../components/ProductType/type.ts";
import { Toast } from "primereact/toast";

type Props = {};

const CreateProduct = (props: Props) => {
  const toast = React.useRef<Toast>(null);
  const [category, setCategory] = React.useState<CategoryType | null>(null);
  const [productType, setProductType] = React.useState<ProductTypesType | null>(
    null
  );
  const [variants, setVariants] = React.useState<VariantType[]>([]);
  const [price, setPrice] = React.useState<number>(0);
  const [originalPrice, setOriginalPrice] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [productFeatured, setProductFeatured] = React.useState<boolean>(false);
  const [productVisible, setProductVisible] = React.useState<boolean>(true);
  const [productDeleted, setProductDeleted] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [productTypes, setProductTypes] = React.useState<ProductTypesType[]>(
    []
  );

  const remove = (id: number) => {
    setVariants((prev) => [...prev.filter((item) => item.id != id)]);
  };

  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Product Type Saved",
    });
  };

  const addingVariantData = () => {
    const variant = {
      productType: productType!,
      price,
      originalPrice,
      visible,
      deleted,
    };
    setVariants((prev) => [variant, ...prev.slice(1)]);
    setPrice(0);
    setOriginalPrice(0);
    setProductType(null);
    show();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productData: ProductType = {
      title,
      imageUrl,
      description,
      deleted: productDeleted,
      featured: productFeatured,
      variants: variants,
      visible: productVisible,
      category: category!,
    };

    console.log(productData);
    await postToApi("product", productData);
  }

  const handleChangeCategory = (e: CascadeSelectChangeEvent) => {
    setVariants([]);
    setPrice(0);
    setOriginalPrice(0);
    setProductType(null);
    setCategory(e.value);
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

  return (
    <div className="container my-8 flex flex-col">
      <h2 className="font-bold mb-4 text-2xl">Create New Product</h2>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <Input handlerSet={setTitle} inputTypeName="text" labelText="Title" />
        <div>
          <Input
            handlerSet={setImageUrl}
            inputTypeName="text"
            labelText="Image"
          />
          {imageUrl && (
            <img
              alt="product"
              src={imageUrl}
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <span className="p-float-label">
            <CascadeSelect
              inputId="select-category"
              value={category}
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
        {category && (
          <Button
            onClick={() =>
              setVariants([
                {
                  id: variants.length + 1,
                  deleted: false,
                  price: 0,
                  originalPrice: 0,
                  productType: productType!,
                  visible: true,
                },
                ...variants,
              ])
            }
            gradientDuoTone="purpleToBlue"
            outline
          >
            Add Product Type
          </Button>
        )}
        {/* Toast after insert Product Type/Variant Product */}
        <Toast ref={toast} />

        <AddProductType
          category={category}
          addingVariantData={addingVariantData}
          originalPrice={originalPrice}
          price={price}
          productType={productType}
          productTypes={productTypes}
          setDeleted={setDeleted}
          setOriginalPrice={setOriginalPrice}
          setPrice={setPrice}
          setProductType={setProductType}
          setVisible={setVisible}
          variants={variants}
          remove={remove}
        />
        <MyCheckbox
          defaultChecked={productFeatured}
          handlerSet={setProductFeatured}
          htmlFor="Featured"
          labelText="Featured"
        />
        <MyCheckbox
          defaultChecked={productVisible}
          handlerSet={setProductVisible}
          htmlFor="Visible"
          labelText="Visible"
        />
        <MyCheckbox
          defaultChecked={productDeleted}
          handlerSet={setProductDeleted}
          htmlFor="Deleted"
          labelText="Deleted"
        />
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
