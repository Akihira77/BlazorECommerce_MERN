import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { BsPencilSquare } from "react-icons/bs";
import { putToApi } from "../../utils/axiosCommand.ts";
import {
    CategoryType,
    ErrorResponse,
    SuccessResponse,
    ToastType,
} from "@/src/utils/types.js";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";

type Props = {
    categoryProps: CategoryType;
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
    token: string;
};
const EditCategory = ({ categoryProps, setCategories, token }: Props) => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const toast = React.useRef<Toast>(null);
    const [category, setCategory] = React.useState<CategoryType>(categoryProps);

    const show = (severity: ToastType, summary: string, detail: string) => {
        toast.current?.show({
            severity,
            summary,
            detail,
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setOpenModal("default");

        const response = await putToApi(
            "category",
            category._id!,
            category,
            token
        );
        const successResponse = response as SuccessResponse;
        const errorResponse = response as ErrorResponse;

        if (errorResponse.statusCode == 401) {
            show("error", "Error", errorResponse.msg);
        } else {
            setCategories(successResponse.data.categories);
            show("success", "Success", "Updating Success");
            setOpenModal(undefined);
        }
    }

    return (
        <>
            <Button
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setOpenModal("default")}
            >
                <BsPencilSquare />
            </Button>
            <Modal
                show={openModal === "default"}
                onClose={() => setOpenModal(undefined)}
            >
                <Modal.Header>Edit Category</Modal.Header>
                <Modal.Body>
                    <form
                        className="flex flex-col gap-4 [&>label]:px-6"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <label>
                            <div className="mb-1 font-bold">Name</div>
                            <TextInput
                                defaultValue={category.name ?? ""}
                                placeholder="category name"
                                onChange={(e) =>
                                    setCategory({
                                        ...category,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            <div className="mb-1 font-bold">Url</div>
                            <TextInput
                                defaultValue={category.url ?? ""}
                                placeholder="url for category"
                                onChange={(e) =>
                                    setCategory({
                                        ...category,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            <div className="mb-1 font-bold">Status</div>
                            <div className="ms-6 card flex flex-col gap-3">
                                <div className="flex items-center">
                                    <Checkbox
                                        inputId="visible"
                                        name="visible"
                                        checked={category.visible}
                                        onChange={(e) =>
                                            setCategory({
                                                ...category,
                                                visible: e.checked!,
                                            })
                                        }
                                    />
                                    <label htmlFor="visible" className="ml-2">
                                        Visible
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox
                                        inputId="deleted"
                                        name="deleted"
                                        checked={category.deleted}
                                        onChange={(e) =>
                                            setCategory({
                                                ...category,
                                                deleted: e.checked!,
                                            })
                                        }
                                    />
                                    <label htmlFor="deleted" className="ml-2">
                                        Deleted
                                    </label>
                                </div>
                            </div>
                        </label>

                        <div className="flex gap-3 mt-4 justify-end">
                            <Modal.Footer>
                                <Button
                                    color="gray"
                                    onClick={() => setOpenModal(undefined)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Update</Button>
                            </Modal.Footer>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Toast ref={toast} />
        </>
    );
};

export default EditCategory;
