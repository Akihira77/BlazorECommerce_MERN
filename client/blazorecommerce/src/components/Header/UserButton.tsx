import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";

type Props = {};

const UserButton = (props: Props) => {
  return (
    <Dropdown
      label={<BsFillPersonFill />}
      gradientDuoTone="purpleToBlue"
      outline
    >
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
    </Dropdown>
  );
};

export default UserButton;
