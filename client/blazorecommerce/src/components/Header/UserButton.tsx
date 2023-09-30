import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useCookies } from "react-cookie";

type Props = {
    user?: object;
};

const UserButton = ({ user }: Props) => {
    const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

    function logout() {
        removeCookie("user");
        removeCookie("token");
        window.location.href = "/";
    }

    return (
        <Dropdown
            label={<BsFillPersonFill />}
            gradientDuoTone="purpleToBlue"
            outline
        >
            {!user || Object.keys(user).length == 0 ? (
                <>
                    <Dropdown.Item>
                        <Link
                            to={"/login"}
                            style={{
                                textDecoration: "none",
                                color: "rgb(28, 32, 36)",
                                cursor: "pointer",
                            }}
                            reloadDocument
                        >
                            Login
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link
                            to={"/register"}
                            style={{
                                textDecoration: "none",
                                color: "rgb(28, 32, 36)",
                                cursor: "pointer",
                            }}
                            reloadDocument
                        >
                            Register
                        </Link>
                    </Dropdown.Item>
                </>
            ) : (
                <Dropdown.Item
                    style={{
                        textDecoration: "none",
                        color: "rgb(28, 32, 36)",
                        cursor: "pointer",
                    }}
                    onClick={logout}
                >
                    Logout
                </Dropdown.Item>
            )}
        </Dropdown>
    );
};

export default UserButton;
