import React, { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { StatusCodes } from "../../utils/constant.ts";
import { toast } from "react-toastify";
import { ToastType } from "../../utils/types";
import Input from "../Input.tsx";
import { Toast } from "primereact/toast";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef<Toast>(null);
  const show = (
    text: string,
    severity: "error" | "success" | "info" | "error",
    summary: string
  ) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: text,
    });
  };
  // const notify = (text: string, type: ToastType) =>
  //   toast(text, {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: false,
  //     progress: undefined,
  //     theme: "light",
  //     type: type,
  //   });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const response: any = await postToApi("user/login", {
      email,
      password,
    });

    if (response.statusCode && response.statusCode !== StatusCodes.Ok200) {
      // notify(response.msg, "error");
      show(response.msg, "error", "Error");
      return;
    }

    localStorage.setItem("token", response.data.data.token);
    show("Welcome", "success", "Success");
    // notify("Welcome", "success");
  }

  return (
    <>
      <div className="mt-9 w-[400px] mx-auto">
        <h3 className="text-center mb-5 text-4xl">Login</h3>
        <form
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
            styled={{ marginBottom: "2rem" }}
          />

          <Button type="submit" gradientDuoTone="purpleToBlue">
            Login
          </Button>
        </form>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Login;
