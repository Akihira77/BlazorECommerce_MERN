import React from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { CategoryType, ProductTypesType } from "../../utils/types";
import { GrAdd } from "react-icons/gr";
import {
  CascadeSelect,
  CascadeSelectChangeEvent,
} from "primereact/cascadeselect";
import useGetFromApi from "../../hooks/useGetFromApi.tsx";
import { CategoryResultType } from "../Category/type.ts";
import { Toast } from "primereact/toast";

type Props = {
  setProductTypes: React.Dispatch<React.SetStateAction<ProductTypesType[]>>;
};

const CreateProductType = ({ setProductTypes }: Props) => {
  const toast = React.useRef<Toast>(null);
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const [name, setName] = React.useState("Book");
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryType | null>(null);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  const show = (e: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: e,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await postToApi("product-type", {
      name,
      category: selectedCategory?._id,
    });

    if ("data" in response) {
      setProductTypes(response.data?.data.productTypes);
      setOpenModal(undefined);
    } else {
      show(response.msg);
    }
  }

  const data = useGetFromApi<CategoryResultType>("category")?.categories;

  React.useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

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
