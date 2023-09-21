import { ProductType } from "@/src/utils/types.js";
import { Button } from "flowbite-react";
import { BsPencilSquare } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { Navigate } from "react-router-dom";

const actionsBodyTemplate = (product: ProductType) => {
  return (
    <div className="flex justify-center gap-3">
      <Button
        gradientDuoTone="purpleToBlue"
        outline
        onClick={() => Navigate({ to: `edit/${product._id}` })}
      >
        <BsPencilSquare />
      </Button>
      <Button
        gradientDuoTone="purpleToPink"
        outline
        onClick={() => Navigate({ to: `delete/${product._id}` })}
      >
        <FiTrash />
      </Button>
    </div>
  );
};

export default actionsBodyTemplate;
