import { Link, NavLink } from "react-router-dom";
import "../UserSidebar.css";
import Avatar from "./Avatar";

import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

// icons
import { IoAddCircleOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

function UserNavbar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div className=" bg-slate-800 h-screen py-10  rounded-tr-2xl rounded-br-2xl  text-white  flex flex-col ">
      <div className="w-[350px] pl-10  ">
        <div className="flex gap-5 my-5  items-end ">
          <Avatar user={user} />
        </div>
        <hr />
        <ul className="flex flex-col my-10  gap-3">
          <li className=" nav-item">
            <NavLink className="flex gap-2 items-center" to="/">
              <FaProjectDiagram className="text-xl" /> Projects
            </NavLink>
          </li>
          <li className=" nav-item">
            <NavLink className="flex gap-2 items-center " to="/create">
              <IoAddCircleOutline className="text-xl" /> Create
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <button
          className="btn btn-error btn-block text-white  "
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNavbar;

//
