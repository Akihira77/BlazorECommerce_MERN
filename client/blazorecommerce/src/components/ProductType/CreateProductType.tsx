import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
} from "@radix-ui/themes";
import { getFromApi, postToApi } from "../../utils/axiosCommand.ts";
import {
  CategoryType,
  ErrorResponse,
  SuccessResponse,
} from "../../utils/types";

type Props = {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateProductType = ({ setFlag }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Book");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    postToApi("product-type", { name, category: selectedCategory }).then(() => {
      setOpen(false);
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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          variant="surface"
          style={{ position: "relative", left: "83.25%" }}
          color="green"
        >
          Create New Product Type
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create New Product Type</Dialog.Title>
        <form
          action=""
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              defaultValue={name}
              placeholder="category name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <Select.Root
            onValueChange={(categoryId) => setSelectedCategory(categoryId)}
          >
            <Select.Trigger
              placeholder="Select a category..."
              variant="surface"
            />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Category</Select.Label>
                {categories &&
                  categories.map((category) => (
                    <Select.Item value={category.id} key={category.id}>
                      {category.name}
                    </Select.Item>
                  ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Create</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateProductType;
