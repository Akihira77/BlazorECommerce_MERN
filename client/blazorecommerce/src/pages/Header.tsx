import React from "react";
import Brand from "../components/Header/Brand.tsx";
import Search from "../components/Header/Search.tsx";
import UserButton from "../components/Header/UserButton.tsx";
import Cart from "../components/Header/Cart.tsx";

type Props = {
    user?: object;
};

const Header = ({ user }: Props) => {
    return (
        <div className="flex items-center gap-4 px-14 py-2 h-[65px] border-b-2">
            <Brand />
            <Search />
            <div className="flex gap-3 items-center">
                <Cart />
                <UserButton user={user} />
            </div>
        </div>
    );
};

export default Header;
