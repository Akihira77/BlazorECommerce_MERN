import { ProductType } from "@/src/utils/types.js";
import { Button } from "flowbite-react";
import { BsPencilSquare } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ActionsBodyTemplate = (product: ProductType) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-3">
      <Button
        gradientDuoTone="purpleToBlue"
        outline
        onClick={() => navigate(`edit/${product._id}`)}
      >
        <BsPencilSquare />
      </Button>
      <Button
        gradientDuoTone="purpleToPink"
        outline
        onClick={() => navigate(`delete/${product._id}`)}
      >
        <FiTrash />
      </Button>
    </div>
  );
};

export default ActionsBodyTemplate;
