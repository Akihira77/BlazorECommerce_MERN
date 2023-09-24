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
import CreateProduct from "./pages/CreateProduct.tsx";
import EditProduct from "./pages/EditProduct.tsx";
import DeleteProduct from "./pages/DeleteProduct.tsx";

function App() {
  return (
    <>
      {/* Header */}
      <main>
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
              <Route path="product">
                <Route index element={<Product />} />
                <Route path="create" element={<CreateProduct />} />
                <Route path="edit/:id" element={<EditProduct />} />
                <Route path="delete/:id" element={<DeleteProduct />} />
              </Route>
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
