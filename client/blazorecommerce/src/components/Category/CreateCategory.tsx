import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { GrAdd } from "react-icons/gr";
import { CategoryType } from "@/src/utils/types.js";
import { Toast } from "primereact/toast";

type Props = {
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const CreateCategory = ({ setCategories }: Props) => {
  const toast = React.useRef<Toast>(null);
  const [openModal, setOpenModal] = useState<string>();
  const [name, setName] = useState("Book");
  const [url, setUrl] = useState("books");

  const show = (e: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: e,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await postToApi("category", { name, url });

    if ("data" in response) {
      setCategories(response.data?.data.categories);
      setOpenModal(undefined);
    } else {
      show(response.msg);
    }
  }

  return (
    <div className="relative mb-16">
      <Toast ref={toast} />
      <Button
        gradientDuoTone="greenToBlue"
        outline
        onClick={() => setOpenModal("default")}
        className="absolute right-0"
      >
        <div className="flex items-center gap-2">
          <GrAdd />
          <p>Create New Category</p>
        </div>
      </Button>

      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Create New Category</Modal.Header>

        <Modal.Body>
          <form
            action=""
            className="flex flex-col gap-4 [&>label]:px-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label>
              <div className="mb-1 font-bold">Name</div>
              <TextInput
                defaultValue={name}
                placeholder="category name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </label>
            <label>
              <div className="mb-1 font-bold">Url</div>
              <TextInput
                defaultValue={url}
                placeholder="url for category"
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>

            <div className="flex gap-3 mt-4 justify-end">
              <Modal.Footer>
                <Button color="gray" onClick={() => setOpenModal(undefined)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </Modal.Footer>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateCategory;
