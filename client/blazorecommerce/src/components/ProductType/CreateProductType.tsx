import React, { useEffect, useState } from "react";
import { Button, Modal, TextInput, Select } from "flowbite-react";
import { getFromApi, postToApi } from "../../utils/axiosCommand.ts";
import {
  CategoryType,
  ErrorResponse,
  SuccessResponse,
} from "../../utils/types";
import { GrAdd } from "react-icons/gr";
import {
  CascadeSelect,
  CascadeSelectChangeEvent,
} from "primereact/cascadeselect";

type Props = {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateProductType = ({ setFlag }: Props) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [name, setName] = useState("Book");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    postToApi("product-type", { name, category: selectedCategory }).then(() => {
      setOpenModal(undefined);
      setFlag((prev) => !prev);
    });
  }

  useEffect(() => {
    async function callApi() {
      const response = await getFromApi("category");

      if ("data" in response) {
        setCategories((response as SuccessResponse).data.categories);
      } else {
        console.log((response as ErrorResponse).msg);
      }
    }

    callApi();
  }, []);

  return (
    <div className="relative" style={{ left: "81%" }}>
      <Button
        gradientDuoTone="greenToBlue"
        outline
        onClick={() => setOpenModal("default")}
      >
        <div className="flex items-center gap-2">
          <GrAdd />
          <p>Create New Product Type</p>
        </div>
      </Button>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Create New Product Type</Modal.Header>
        <Modal.Body>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="mb-2">
              <div className="mb-1 font-bold">Name</div>
              <TextInput
                defaultValue={name}
                placeholder="category name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <span className="p-float-label">
              <CascadeSelect
                inputId="multiselect"
                value={selectedCategory}
                onChange={(e: CascadeSelectChangeEvent) =>
                  setSelectedCategory(e.value)
                }
                options={categories}
                optionLabel="name"
                optionGroupChildren={[]}
                className="md:w-20rem w-full"
              ></CascadeSelect>
              <label htmlFor="multiselect">Category</label>
            </span>

            {/* <Select onChange={(e) => setSelectedCategory(e)}>
              {categories &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select> */}

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

export default CreateProductType;
