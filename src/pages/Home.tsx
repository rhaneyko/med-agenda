// src/pages/Home.tsx
import React from "react";
import Sidebar from "../components/SideBar";

const Home: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <div className="flex-grow-1 p-4">
        <h2>Bem-vindo ao Med-Agenda</h2>
        <p>Gerencie seus agendamentos médicos de forma simples e eficiente.</p>
      </div>
    </div>
  );
};

export default Home;
