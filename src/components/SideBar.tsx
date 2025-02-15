// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "250px", height: "100vh" }}>
      <h4 className="text-center mb-4">Med-Agenda</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active">
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/agendamentos" className="nav-link text-dark">
            📅 Agendamentos
          </Link>
        </li>
        <li>
          <Link to="/pacientes" className="nav-link text-dark">
            👥 Pacientes
          </Link>
        </li>
        <li>
          <Link to="/configuracoes" className="nav-link text-dark">
            ⚙️ Configurações
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
