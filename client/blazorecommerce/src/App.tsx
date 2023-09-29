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
import React from "react";
import { UserLocalStorageType } from "./utils/types";
import { ScrollPanel } from "primereact/scrollpanel";

function App() {
    const [user, setUser] = React.useState<UserLocalStorageType | null>(null);

    React.useEffect(() => {
        const userRole = JSON.parse(
            localStorage.getItem("user")!
        ) as UserLocalStorageType;

        setUser(userRole);
    }, []);

    return (
        <>
            {/* Header */}
            <main className="max-h-screen">
                <section className="p-0">
                    <Header />
                </section>

                <div className="flex">
                    {user?.role == "admin" && (
                        <section className="sidebar p-0">
                            <SidebarNav />
                        </section>
                    )}

                    <ScrollPanel className="p-0 flex-grow h-[90vh] custombar1">
                        <Routes>
                            <Route path="admin">
                                <Route path="category" element={<Category />} />
                                <Route
                                    path="product-type"
                                    element={<ProductType />}
                                />
                                <Route path="product">
                                    <Route index element={<Product />} />
                                    <Route
                                        path="create"
                                        element={<CreateProduct />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<EditProduct />}
                                    />
                                    <Route
                                        path="delete/:id"
                                        element={<DeleteProduct />}
                                    />
                                </Route>
                                <Route path="user" element={<UserList />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                        {/* <Outlet /> */}
                    </ScrollPanel>
                </div>
            </main>
        </>
    );
}

export default App;
