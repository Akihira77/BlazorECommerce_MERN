import React, { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { postToApi } from "../../utils/axiosCommand.ts";
import Input from "../Input.tsx";
import { toast } from "react-toastify";
import { StatusCodes } from "../../utils/constant.ts";
import { ToastType } from "../../utils/types";
import { Toast } from "primereact/toast";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const show = (text: string, severity: ToastType, summary: string) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: text,
    });
  };

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
      show(response.msg, "error", "Error");
      return;
    }

    show("Registration success", "success", "Success");
    navigate("/login");
  }

  return (
    <>
      <div className="mt-9 w-[400px] mx-auto">
        <h3 className="text-center mb-5 text-4xl">Register</h3>
        <form
          className="flex justify-center flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex justify-between mb-3 gap-3">
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
          </div>

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
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Register
          </Button>
        </form>

        {/* Toast */}
        <Toast ref={toast} />
      </div>
    </>
  );
};

export default Register;
