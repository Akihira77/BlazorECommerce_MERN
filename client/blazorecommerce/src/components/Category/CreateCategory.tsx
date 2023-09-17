import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { GrAdd } from "react-icons/gr";
import { CategoryType } from "@/src/utils/types.js";

type Props = {
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const CreateCategory = ({ setCategories }: Props) => {
  const [openModal, setOpenModal] = useState<string>();
  const [name, setName] = useState("Book");
  const [url, setUrl] = useState("books");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    postToApi("category", { name, url }).then((response) => {
      setCategories(response.data?.data.categories);
      setOpenModal(undefined);
    });
  }

  return (
    <div className="relative" style={{ left: "83.4%" }}>
      <Button
        gradientDuoTone="greenToBlue"
        outline
        onClick={() => setOpenModal("default")}
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
