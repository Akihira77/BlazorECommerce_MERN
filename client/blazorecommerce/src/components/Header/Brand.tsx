import React from "react";
// import { Link } from "react-router-dom";
import { Flex, Avatar, Link, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

type Props = {};

const Brand = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      style={{
        transform: "rotate(-2deg)",
        padding: "1.4rem 1rem",
      }}
      variant="surface"
      onClick={() => navigate("/")}
    >
      <Flex gap="2" align={"center"}>
        <Avatar
          src="https://res.cloudinary.com/duthytmqy/image/upload/v1682229266/bec-high-resolution-logo-color-on-transparent-background_mnb8ph.png"
          fallback="brand"
        />
        <span>BlazorECommerce</span>
      </Flex>
    </Button>
  );
};

export default Brand;
