import React from "react";
import { Table } from "flowbite-react";
import { ProductTypesType } from "../../utils/types";
import EditProductType from "./EditProductType.tsx";
import DeleteProductType from "./DeleteProductType.tsx";

type Props = {
    productTypes?: ProductTypesType[];
    setProductTypes: React.Dispatch<React.SetStateAction<ProductTypesType[]>>;
};

const MainTable = ({ productTypes, setProductTypes }: Props) => {
    return (
        <Table hoverable style={{ marginTop: "1rem" }}>
            <Table.Head>
                <Table.HeadCell align={"center"}>Name</Table.HeadCell>
                <Table.HeadCell align={"center"}>Category</Table.HeadCell>
                <Table.HeadCell align={"center"}>Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
                {productTypes &&
                    productTypes.map((item) => (
                        <Table.Row key={item._id}>
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
                                <div>
                                    <EditProductType
                                        productTypeCategory={item.category.name}
                                        setProductTypes={setProductTypes}
                                        productTypeId={item._id}
                                        productTypeName={item.name}
                                    />
                                </div>
                                <div>
                                    <DeleteProductType
                                        productTypeCategory={item.category.name}
                                        setProductTypes={setProductTypes}
                                        productTypeId={item._id}
                                        productTypeName={item.name}
                                    />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};

export default MainTable;
