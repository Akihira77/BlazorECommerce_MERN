import React, { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { StatusCodes } from "../../utils/constant.ts";
import { ToastType } from "../../utils/types";
import Input from "../Input.tsx";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

        const response: any = await postToApi("user/login", {
            email,
            password,
        });

        if (response.statusCode && response.statusCode !== StatusCodes.Ok200) {
            // notify(response.msg, "error");
            show(response.msg, "error", "Error");
            return;
        }

        // console.log(response);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        if (response.data.data.user.role == "admin") {
            navigate("/admin");
        } else {
            navigate("");
        }
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
                        readOnly={false}
                    />

                    <Input
                        labelText="password"
                        inputTypeName="password"
                        handlerSet={setPassword}
                        styled={{ marginBottom: "2rem" }}
                        readOnly={false}
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
