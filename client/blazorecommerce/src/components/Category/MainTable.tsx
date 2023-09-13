import React from "react";
import { CategoryType } from "../../utils/types";
import { Box, Table } from "@radix-ui/themes";
import EditCategory from "./EditCategory.tsx";
import DeleteCategory from "./DeleteCategory.tsx";

type Props = {
  categories?: CategoryType[];
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainTable = ({ categories, setFlag }: Props) => {
  return (
    <Table.Root variant="surface" style={{ marginTop: "1rem" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify={"center"}>
            Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify={"center"}>
            Url
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify={"center"}>
            Actions
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories &&
          categories.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.url}</Table.Cell>
              <Table.Cell
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <EditCategory
                    setFlag={setFlag}
                    categoryId={item.id}
                    categoryName={item.name}
                    categoryUrl={item.url}
                  />
                </Box>
                <Box>
                  <DeleteCategory
                    setFlag={setFlag}
                    categoryId={item.id}
                    categoryName={item.name}
                    categoryUrl={item.url}
                  />
                </Box>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};

export default MainTable;
