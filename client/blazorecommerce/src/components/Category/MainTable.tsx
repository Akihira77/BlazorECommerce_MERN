import React from "react";
import { CategoryType } from "../../utils/types";
import { Table } from "flowbite-react";
import EditCategory from "./EditCategory.tsx";
import DeleteCategory from "./DeleteCategory.tsx";
import { Checkbox } from "primereact/checkbox";

type Props = {
    categories?: CategoryType[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
    token: string;
};

const MainTable = ({ categories, setCategories, token }: Props) => {
    return (
        <Table hoverable style={{ marginTop: "1rem" }}>
            <Table.Head>
                <Table.HeadCell align="center">Name</Table.HeadCell>
                <Table.HeadCell align="center">Url</Table.HeadCell>
                <Table.HeadCell align="center">Status</Table.HeadCell>
                <Table.HeadCell align="center">Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
                {categories &&
                    categories.map((item, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.url}</Table.Cell>
                            <Table.Cell>
                                <div className="ms-6 card flex flex-col gap-3">
                                    <div className="flex items-center">
                                        <Checkbox
                                            inputId="visible"
                                            name="visible"
                                            disabled
                                            checked={item.visible}
                                        />
                                        <label
                                            htmlFor="visible"
                                            className="ml-2"
                                        >
                                            Visible
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            inputId="deleted"
                                            name="deleted"
                                            disabled
                                            checked={item.deleted}
                                        />
                                        <label
                                            htmlFor="deleted"
                                            className="ml-2"
                                        >
                                            Deleted
                                        </label>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <EditCategory
                                        setCategories={setCategories}
                                        categoryProps={item}
                                        token={token}
                                    />
                                </div>
                                <div>
                                    <DeleteCategory
                                        setCategories={setCategories}
                                        categoryId={item._id}
                                        categoryName={item.name}
                                        categoryUrl={item.url}
                                        token={token}
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
