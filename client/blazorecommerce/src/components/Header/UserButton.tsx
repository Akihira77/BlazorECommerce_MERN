import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DropdownMenu, Button } from "@radix-ui/themes";

type Props = {};

const UserButton = (props: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="surface" size={"3"}>
          <BsFillPersonFill />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        {/* <DropdownMenu.Item>Profile</DropdownMenu.Item> */}
        <DropdownMenu.Item>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "rgb(28, 32, 36)" }}
          >
            Login
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "rgb(28, 32, 36)" }}
          >
            Register
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserButton;
