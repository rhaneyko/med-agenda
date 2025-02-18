// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./SideBar";

const Layout: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar sempre visível */}
      <Sidebar />

      {/* Conteúdo dinâmico das páginas */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
