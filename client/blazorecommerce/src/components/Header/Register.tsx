import React, { useState } from "react";
import { Container, Button, Text, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { postToApi } from "../../utils/axiosCommand.ts";
import * as Form from "@radix-ui/react-form";
import Input from "../Input.tsx";
import { toast } from "react-toastify";
import { StatusCodes } from "../../utils/constant.ts";
import { ToastType } from "../../utils/types";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const notify = (text: string, type: ToastType) =>
    toast(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      type: type,
    });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    const response = await postToApi("user/register", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    console.log(response);
    if (response.statusCode == StatusCodes.BadRequest400) {
      notify(response.msg, "error");
      // console.log(response.msg);
      return;
    }

    notify("Registration success", "success");
    navigate("/login");
  }

  return (
    <>
      <Container size={"1"} mt={"9"}>
        <Text size={"7"} className="text-center pb-5" asChild>
          <h3>Register</h3>
        </Text>
        <Form.Root
          className="flex justify-center flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Flex justify={"between"} mb={"3"} gap={"3"}>
            <Input
              labelText="first Name"
              inputTypeName="text"
              handlerSet={setFirstName}
              styled={{ width: "100%" }}
            />

            <Input
              labelText="last Name"
              inputTypeName="text"
              handlerSet={setLastName}
              styled={{ width: "100%" }}
            />
          </Flex>

          <Input
            labelText="email"
            inputTypeName="email"
            handlerSet={setEmail}
            styled={{ marginBottom: "1rem" }}
          />

          <Input
            labelText="password"
            inputTypeName="password"
            handlerSet={setPassword}
            styled={{ marginBottom: "1rem" }}
          />

          <Input
            labelText="confirm Password"
            inputTypeName="password"
            handlerSet={setConfirmPassword}
            styled={{ marginBottom: "2rem" }}
          />
          <Form.Submit asChild>
            <Button variant="solid" id="a">
              Register
            </Button>
          </Form.Submit>
        </Form.Root>

        {/* Toast */}
      </Container>
    </>
  );
};

export default Register;
