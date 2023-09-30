import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import "../assets/styles/SidebarNav.css";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const UserSidebarNav = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="flex w-[250px]">
                <Sidebar
                    style={{
                        color: "rgb(139, 161, 183)",
                        borderRight: "2px solid #ddd",
                        minHeight: "90.8vh",
                    }}
                    breakPoint="lg"
                    collapsed={collapsed}
                    className="overflow-auto"
                >
                    <Menu style={{ paddingTop: "1.5rem" }}>
                        <MenuItem
                            icon={<AiOutlineHome />}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </MenuItem>
                        <SubMenu icon={<MdOutlineCategory />} label="Category">
                            <MenuItem>Book</MenuItem>
                            <MenuItem>Video Game</MenuItem>
                            <MenuItem>Others</MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
                {/* <div
        style={{ position: "absolute", zIndex: "3", right: "0", top: "10px" }}
      >
        <input
          type="checkbox"
          role="button"
          aria-label="Display the menu"
          className="menu"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div> */}
            </div>
            <Outlet />
        </>
    );
};

export default UserSidebarNav;
