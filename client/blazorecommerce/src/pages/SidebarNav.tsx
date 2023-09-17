import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoStatsChart } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlineCategory, MdProductionQuantityLimits } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import "../assets/styles/SidebarNav.css";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const SidebarNav = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="relavite flex w-[250px]">
        <Sidebar
          style={{
            minHeight: "100vh",
            overflow: "auto",
            color: "rgb(139, 161, 183)",
            borderRight: "2px solid #ddd",
          }}
          breakPoint="lg"
          collapsed={collapsed}
        >
          <Menu style={{ paddingTop: "1.5rem" }}>
            <SubMenu icon={<IoStatsChart />} label="Charts">
              <MenuItem>Pie charts</MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<RxDashboard />}
              onClick={() => navigate("/admin/dashboard")}
            >
              <h4>Dashboard</h4>
            </MenuItem>
            <MenuItem
              icon={<FaUsersGear />}
              onClick={() => navigate("/admin/user")}
            >
              <h4>User</h4>
            </MenuItem>
            <MenuItem
              icon={<HiOutlineClipboardDocumentCheck />}
              onClick={() => navigate("/admin/order")}
            >
              <h4>Order</h4>
            </MenuItem>
            <MenuItem
              icon={<MdOutlineCategory />}
              onClick={() => navigate("/admin/category")}
            >
              <h4>Category</h4>
            </MenuItem>
            <MenuItem
              icon={<LiaProductHunt />}
              onClick={() => navigate("/admin/product-type")}
            >
              <h4>Product Type</h4>
            </MenuItem>
            <MenuItem
              icon={<MdProductionQuantityLimits />}
              onClick={() => navigate("/admin/product")}
            >
              <h4>Product</h4>
            </MenuItem>
            <MenuItem
              icon={<AiOutlineLogin />}
              onClick={() => navigate("/admin/log")}
            >
              <h4>Log</h4>
            </MenuItem>
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

export default SidebarNav;
