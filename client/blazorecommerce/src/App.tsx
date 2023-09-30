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
import UserSidebarNav from "./pages/UserSidebarNav.tsx";
import { useCookies } from "react-cookie";

function App() {
    const [user, setUser] = React.useState<UserLocalStorageType | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

    // React.useEffect(() => {
    //     const keys = Object.keys(cookies).length;
    // }, []);

    function checkCookies(): boolean {
        return Object.keys(cookies).length > 0;
    }

    return (
        <>
            {/* Header */}
            <main className="max-h-screen">
                <section className="p-0">
                    <Header user={cookies.user} />
                </section>

                <div className="flex">
                    <section className="sidebar p-0">
                        {!checkCookies() || cookies?.user?.role == "user" ? (
                            <UserSidebarNav />
                        ) : (
                            <SidebarNav />
                        )}
                    </section>

                    <ScrollPanel className="p-0 flex-grow h-[90vh] custombar1">
                        <Routes>
                            <Route path="" element={<Body />} />
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
