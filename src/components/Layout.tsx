import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./SideBar";

const Layout: React.FC = () => {
    return(
        <div className="d-flex">
            <Sidebar/>

            <div className="flex-grow-1 p-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;