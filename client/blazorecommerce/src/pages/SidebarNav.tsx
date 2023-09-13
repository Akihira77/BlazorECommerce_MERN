import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoStatsChart } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlineCategory, MdProductionQuantityLimits } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Flex, Text } from "@radix-ui/themes";
import "../assets/styles/SidebarNav.css";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const SidebarNav = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex position={"relative"} style={{ width: "250px" }}>
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
            <Text>Dashboard</Text>
          </MenuItem>
          <MenuItem
            icon={<FaUsersGear />}
            onClick={() => navigate("/admin/user")}
          >
            <Text>User</Text>
          </MenuItem>
          <MenuItem
            icon={<HiOutlineClipboardDocumentCheck />}
            onClick={() => navigate("/admin/order")}
          >
            <Text>Order</Text>
          </MenuItem>
          <MenuItem
            icon={<MdOutlineCategory />}
            onClick={() => navigate("/admin/category")}
          >
            <Text>Category</Text>
          </MenuItem>
          <MenuItem
            icon={<LiaProductHunt />}
            onClick={() => navigate("/admin/product-type")}
          >
            <Text>Product Type</Text>
          </MenuItem>
          <MenuItem
            icon={<MdProductionQuantityLimits />}
            onClick={() => navigate("/admin/product")}
          >
            <Text>Product</Text>
          </MenuItem>
          <MenuItem
            icon={<AiOutlineLogin />}
            onClick={() => navigate("/admin/log")}
          >
            <Text>Log</Text>
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
    </Flex>
  );
};

export default SidebarNav;
