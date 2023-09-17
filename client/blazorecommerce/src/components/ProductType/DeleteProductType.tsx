import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { FiTrash } from "react-icons/fi";
import { deleteToApi } from "../../utils/axiosCommand.ts";
import { ProductTypesType } from "@/src/utils/types.js";

type Props = {
  productTypeId: string | null;
  productTypeName: string | null;
  productTypeCategory: string | null;
  setProductTypes: React.Dispatch<React.SetStateAction<ProductTypesType[]>>;
};

const DeleteProductType = ({
  productTypeId,
  productTypeName,
  productTypeCategory,
  setProductTypes,
}: Props) => {
  const [openModal, setOpenModal] = useState<string | undefined>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    deleteToApi("product-type", productTypeId!).then((response) => {
      setOpenModal(undefined);
      setProductTypes(response.data?.data.productTypes);
    });
  }

  return (
    <>
      <Button
        gradientDuoTone="purpleToPink"
        outline
        onClick={() => setOpenModal("default")}
      >
        <FiTrash />
      </Button>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Delete Category</Modal.Header>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 [&>label]:px-6"
        >
          <label>
            <div className="mb-1 font-bold">Name</div>
            <TextInput
              defaultValue={productTypeName ?? ""}
              placeholder="category name"
              disabled
            />
          </label>
          <label>
            <div className="mb-1 font-bold">Category</div>
            <TextInput
              defaultValue={productTypeCategory ?? ""}
              placeholder="url for category"
              disabled
            />
          </label>

          <div className="flex gap-3 mt-4 justify-end">
            <Modal.Footer>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                Cancel
              </Button>
              <Button type="submit">Delete</Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DeleteProductType;
