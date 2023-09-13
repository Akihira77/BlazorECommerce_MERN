import React, { useState } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FiTrash } from "react-icons/fi";
import { deleteToApi } from "../../utils/axiosCommand.ts";

type Props = {
  categoryId: string | null;
  categoryName: string | null;
  categoryUrl: string | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteCategory = ({
  categoryId,
  categoryName,
  categoryUrl,
  setFlag,
}: Props) => {
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    deleteToApi("category", categoryId!).then(() => {
      setOpen(false);
      setFlag((prev) => !prev);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="surface" color="red">
          <FiTrash />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Category</Dialog.Title>
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
              defaultValue={categoryName ?? ""}
              placeholder="category name"
              disabled
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Url
            </Text>
            <TextField.Input
              defaultValue={categoryUrl ?? ""}
              placeholder="url for category"
              disabled
            />
          </label>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Delete</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteCategory;
