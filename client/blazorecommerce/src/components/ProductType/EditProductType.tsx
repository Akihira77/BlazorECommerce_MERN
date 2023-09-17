import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { BsPencilSquare } from "react-icons/bs";
import { putToApi } from "../../utils/axiosCommand.ts";

type Props = {
  productTypeId: string | null;
  productTypeName: string | null;
  productTypeCategory: string | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditProductType = ({
  productTypeId,
  productTypeName,
  productTypeCategory,
  setFlag,
}: Props) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState(productTypeName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpenModal("true");
    console.log(name);

    putToApi("product-type", productTypeId!, { name }).then(() => {
      setOpenModal(undefined);
      setFlag((prev) => !prev);
    });
  }

  return (
    <>
      <Button
        gradientDuoTone="purpleToBlue"
        outline
        onClick={() => setOpenModal("default")}
      >
        <BsPencilSquare />
      </Button>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Edit Category</Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-4 [&>label]:px-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label>
              <div className="mb-1 font-bold">Name</div>
              <TextInput
                defaultValue={productTypeName ?? ""}
                placeholder="category name"
                onChange={(e) => setName(e.target.value)}
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
                <Button type="submit">Update</Button>
              </Modal.Footer>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductType;
