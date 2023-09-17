import React from "react";
import { Avatar, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Brand = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      style={{
        transform: "rotate(-2deg)",
      }}
      size={"xs"}
      gradientDuoTone="purpleToBlue"
      outline
      onClick={() => navigate("/")}
    >
      <div className="flex gap-2 items-center">
        <Avatar
          img="https://res.cloudinary.com/duthytmqy/image/upload/v1682229266/bec-high-resolution-logo-color-on-transparent-background_mnb8ph.png"
          className="w-[40px]"
          size={"sm"}
        />
        <span>BlazorECommerce</span>
      </div>
    </Button>
  );
};

export default Brand;
