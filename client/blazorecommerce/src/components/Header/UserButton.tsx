import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {};

const UserButton = (props: Props) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BsFillPersonFill />
      </button>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
        {/* <li>
          <Link className="dropdown-item" to={"/profile"}>
            Profile
          </Link>
        </li> */}
        <li>
          <Link className="dropdown-item" to={"/login"}>
            Login
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to={"/register"}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserButton;
