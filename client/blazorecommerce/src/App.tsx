import "./App.css";
import Header from "./pages/Header.tsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Header/Login.tsx";
import Register from "./components/Header/Register.tsx";
import Body from "./pages/Body.tsx";
import Category from "./pages/Category.tsx";
import SidebarNav from "./pages/SidebarNav.tsx";
import UserList from "./pages/UserList.tsx";
import ProductType from "./pages/ProductType.tsx";
import Product from "./pages/Product.tsx";

function App() {
  return (
    <>
      {/* Header */}
      <main style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <section className="p-0">
          <Header />
        </section>

        {/* Sidebar */}
        <section className="p-0 flex gap-4">
          <Routes>
            {/* <Route path="/" /> */}
            <Route path="admin" element={<SidebarNav />}>
              {/* <Route index /> */}
              <Route path="category" element={<Category />} />
              <Route path="product-type" element={<ProductType />} />
              <Route path="product" element={<Product />} />
            </Route>
            <Route path="/user" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* <Outlet /> */}
        </section>
      </main>
    </>
  );
}

export default App;
