import React, { useState } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(productTypeName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(true);
    console.log(name);

    putToApi("product-type", productTypeId!, { name }).then(() => {
      setOpen(false);
      setFlag((prev) => !prev);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="surface" color="blue">
          <BsPencilSquare />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Product Type</Dialog.Title>
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
              defaultValue={name ?? ""}
              placeholder="productType name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
            <TextField.Input
              defaultValue={productTypeCategory ?? ""}
              disabled
            />
          </label>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Update</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProductType;
