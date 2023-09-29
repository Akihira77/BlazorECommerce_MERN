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
            show(
                "Password and Confirm Password does not match",
                "error",
                "Error"
            );
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
                            readOnly={false}
                        />

                        <Input
                            labelText="last Name"
                            inputTypeName="text"
                            handlerSet={setLastName}
                            styled={{ width: "100%" }}
                            readOnly={false}
                        />
                    </div>

                    <Input
                        labelText="email"
                        inputTypeName="email"
                        handlerSet={setEmail}
                        styled={{ marginBottom: "1rem" }}
                        readOnly={false}
                    />

                    <Input
                        labelText="password"
                        inputTypeName="password"
                        handlerSet={setPassword}
                        styled={{ marginBottom: "1rem" }}
                        readOnly={false}
                    />

                    <Input
                        labelText="confirm Password"
                        inputTypeName="password"
                        handlerSet={setConfirmPassword}
                        styled={{ marginBottom: "2rem" }}
                        readOnly={false}
                    />
                    <Button type="submit" gradientDuoTone="purpleToBlue">
                        Register
                    </Button>
                </form>

                {/* Toast */}
                <Toast ref={toast} />
                <div className="login text-center mt-3">
                    <p>Or</p>
                    <Button
                        className="w-full mt-3"
                        gradientDuoTone="cyanToBlue"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Register;
