import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetFromApi from "../hooks/useGetFromApi.tsx";
import { ProductType, SuccessResponse } from "../utils/types";
import Input from "../components/Input.tsx";
import { Button, Label, Textarea } from "flowbite-react";
import MyCheckbox from "../components/CreateProduct/MyCheckbox.tsx";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProductResultType } from "../components/Product/type.ts";
import { ScrollTop } from "primereact/scrolltop";
import { deleteToApi } from "../utils/axiosCommand.ts";
import { Toast } from "primereact/toast";
import { StatusCodes } from "../utils/constant.ts";
import { ErrorResponse } from "@/src/utils/types.ts";
import { Dialog } from "primereact/dialog";

type Props = {};

const DeleteProduct = (props: Props) => {
  const params = useParams();
  const toast = React.useRef<Toast>(null);
  const navigate = useNavigate();
  const data = useGetFromApi<ProductResultType>(`product/${params.id}`);
  const [product, setProduct] = React.useState<ProductType | null>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const footerContent = (
    <div className="flex gap-4 justify-end">
      <Button onClick={() => setVisible(false)} gradientMonochrome="failure">
        Cancel
      </Button>
      <Button
        onClick={() => handleDelete()}
        autoFocus
        gradientMonochrome="teal"
      >
        Confirm
      </Button>
    </div>
  );

  async function handleDelete() {
    const response = await deleteToApi("product", params.id!);

    console.log(response);
    if ((response as ErrorResponse).statusCode === StatusCodes.NotFound404) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: (response as ErrorResponse).msg,
      });
      return;
    }

    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: (response as SuccessResponse).data?.data.msg,
    });

    setTimeout(() => {
      navigate("/admin/product", { replace: true });
    }, 1000);
  }

  React.useEffect(() => {
    if (data) {
      setProduct(data.product);
    }
  }, [data]);

  return product != null ? (
    <>
      <ScrollTop target="parent" threshold={100} />
      <Toast ref={toast} />
      <div className="container my-8 flex flex-col">
        <div className="flex justify-between">
          <h2 className="font-bold mb-4 text-2xl">Delete Product</h2>
          <Button
            gradientDuoTone="pinkToOrange"
            outline
            className="w-1/4"
            onClick={() => setVisible(true)}
          >
            Delete
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            inputTypeName="text"
            labelText="Title"
            defaultValue={product.title}
            readOnly={true}
          />
          <div>
            <Input
              inputTypeName="text"
              labelText="Image"
              defaultValue={product.imageUrl}
              readOnly={true}
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
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              rows={4}
              className="p-2 rounded-md"
              value={product.description}
              readOnly={true}
            />
          </div>
          <Input
            inputTypeName="text"
            labelText="Category"
            defaultValue={product.category?.name}
            readOnly={true}
          />
          {product.variants?.map((variant) => (
            <div className="flex gap-4" key={variant._id}>
              <Input
                inputTypeName="text"
                labelText="Product Type"
                defaultValue={variant.productType.name}
                readOnly={true}
              />
              <Input
                inputTypeName="number"
                labelText="Price"
                defaultValue={variant.price}
                readOnly={true}
              />

              <Input
                inputTypeName="number"
                labelText="Original Price"
                defaultValue={variant.originalPrice}
                readOnly={true}
              />
            </div>
          ))}

          <MyCheckbox
            defaultChecked={product.featured ?? false}
            htmlFor="Featured"
            labelText="Featured"
          />
          <MyCheckbox
            defaultChecked={product.visible ?? false}
            htmlFor="Visible"
            labelText="Visible"
          />
          <MyCheckbox
            defaultChecked={product.deleted ?? false}
            htmlFor="Deleted"
            labelText="Deleted"
          />
        </div>
      </div>
      <Dialog
        header="Confirmation"
        visible={visible}
        position={"top"}
        // style={{ width: "50vw" }}
        className="w-[50vw] text-center"
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">Do You Really Want To Delete This Product?</p>
      </Dialog>
    </>
  ) : (
    <div className="flex mx-auto items-center">
      <ProgressSpinner />
    </div>
  );
};

export default DeleteProduct;
