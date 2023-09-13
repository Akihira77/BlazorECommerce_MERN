import React from "react";
import { Box, Table } from "@radix-ui/themes";
import { ProductTypesType } from "../../utils/types";
import EditProductType from "./EditProductType.tsx";
import DeleteProductType from "./DeleteProductType.tsx";

type Props = {
  productTypes?: ProductTypesType[];
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainTable = ({ productTypes, setFlag }: Props) => {
  return (
    <Table.Root variant="surface" style={{ marginTop: "1rem" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify={"center"}>
            Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify={"center"}>
            Category
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify={"center"}>
            Actions
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {productTypes &&
          productTypes.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category.name}</Table.Cell>
              <Table.Cell
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <EditProductType
                    productTypeCategory={item.category.name}
                    setFlag={setFlag}
                    productTypeId={item.id}
                    productTypeName={item.name}
                  />
                </Box>
                <Box>
                  <DeleteProductType
                    setFlag={setFlag}
                    productTypeId={item.id}
                    productTypeName={item.name}
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
