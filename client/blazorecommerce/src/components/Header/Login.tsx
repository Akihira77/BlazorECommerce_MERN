import React, { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { postToApi } from "../../utils/axiosCommand.ts";
import { StatusCodes } from "../../utils/constant.ts";
import { ErrorResponse, SuccessResponse, ToastType } from "../../utils/types";
import Input from "../Input.tsx";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type Props = {};

const Login = (props: Props) => {
    const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);
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

        const response = await postToApi("user/login", {
            email,
            password,
        });

        const successResponse = response as SuccessResponse;
        const errorResponse = response as ErrorResponse;

        if (
            errorResponse.statusCode &&
            errorResponse.statusCode !== StatusCodes.Ok200
        ) {
            show(errorResponse.msg, "error", "Error");
            return;
        }

        setCookie("user", successResponse.data.user, {
            maxAge: 3600,
            path: "/",
        });
        setCookie("token", successResponse.data.token, {
            path: "/",
            maxAge: 3600,
        });

        if (successResponse.data.user.role == "user") {
            navigate("/");
        } else {
            navigate("/admin");
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
