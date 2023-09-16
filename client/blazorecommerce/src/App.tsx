import "./App.css";
import Header from "./pages/Header.tsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Header/Login.tsx";
import Register from "./components/Header/Register.tsx";
import { Section } from "@radix-ui/themes";
import Body from "./pages/Body.tsx";
import Category from "./pages/Category.tsx";
import SidebarNav from "./pages/SidebarNav.tsx";
import UserList from "./pages/UserList.tsx";
import ProductType from "./pages/ProductType.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Header */}
      <main style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <Section p={"0"}>
          <Header />
        </Section>

        {/* Sidebar */}
        <Section p={"0"} style={{ display: "flex", gap: "20px" }}>
          <Routes>
            {/* <Route path="/" /> */}
            <Route path="admin" element={<SidebarNav />}>
              {/* <Route index /> */}
              <Route path="category" element={<Category />} />
              <Route path="product-type" element={<ProductType />} />
            </Route>
            <Route path="/user" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* <Outlet /> */}
        </Section>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
