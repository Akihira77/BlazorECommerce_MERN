import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { FiTrash } from "react-icons/fi";
import { deleteToApi } from "../../utils/axiosCommand.ts";
import { CategoryType, SuccessResponse } from "@/src/utils/types.js";
import { Toast } from "primereact/toast";

type Props = {
    categoryId: string | null;
    categoryName: string | null;
    categoryUrl: string | null;
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const DeleteCategory = ({
    categoryId,
    categoryName,
    categoryUrl,
    setCategories,
}: Props) => {
    const toast = React.useRef<Toast>(null);
    const [openModal, setOpenModal] = useState<string | undefined>();

    const show = (
        severity: "success" | "info" | "warn" | "error" | undefined,
        summary: string,
        detail: string
    ) => {
        toast.current?.show({
            severity,
            summary,
            detail,
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await deleteToApi("category", categoryId!);
        const successResponse = response as SuccessResponse;

        if ("categories" in successResponse.data) {
            setCategories(successResponse.data);
            setOpenModal(undefined);
            return;
        }

        show("error", "Error", successResponse.data.msg);
    }

    return (
        <>
            <Toast ref={toast} />
            <Button
                gradientDuoTone="purpleToPink"
                outline
                onClick={() => setOpenModal("default")}
            >
                <FiTrash />
            </Button>
            <Modal
                show={openModal === "default"}
                onClose={() => setOpenModal(undefined)}
            >
                <Modal.Header>Delete Category</Modal.Header>
                <form
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col gap-4 [&>label]:px-6"
                >
                    <label>
                        <div className="mb-1 font-bold">Name</div>
                        <TextInput
                            defaultValue={categoryName ?? ""}
                            placeholder="category name"
                            disabled
                        />
                    </label>
                    <label>
                        <div className="mb-1 font-bold">Url</div>
                        <TextInput
                            defaultValue={categoryUrl ?? ""}
                            placeholder="url for category"
                            disabled
                        />
                    </label>

                    <div className="flex gap-3 mt-4 justify-end">
                        <Modal.Footer>
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(undefined)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Delete</Button>
                        </Modal.Footer>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default DeleteCategory;
