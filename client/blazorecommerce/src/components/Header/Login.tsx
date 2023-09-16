import React, { useState } from "react";
import { Container, Button, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { postToApi } from "../../utils/axiosCommand.ts";
import { StatusCodes } from "../../utils/constant.ts";
import { toast } from "react-toastify";
import { ToastType } from "../../utils/types";
import Input from "../Input.tsx";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    const response: any = await postToApi("user/login", {
      email,
      password,
    });

    if (response.statusCode && response.statusCode !== StatusCodes.Ok200) {
      notify(response.msg, "error");
      return;
    }

    localStorage.setItem("token", response.data.data.token);
    notify("Welcome", "success");
  }

  return (
    <Container size={"1"} mt={"9"}>
      <Text size={"7"} className="text-center mb-5" asChild>
        <h3>Login</h3>
      </Text>
      <Form.Root
        className="flex justify-center flex-col"
        onSubmit={(e) => handleSubmit(e)}
      >
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

        <Form.Submit asChild>
          <Button variant="solid" id="a">
            Login
          </Button>
        </Form.Submit>
      </Form.Root>
    </Container>
  );
};

export default Login;
