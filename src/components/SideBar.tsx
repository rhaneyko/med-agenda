// src/components/Sidebar.tsx
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "250px", height: "100vh" }}>
      <h4 className="text-center mb-4">Med-Agenda</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            🏠 Home
        </li>
        <li>

            📅 Agendamentos
        </li>
        <li>
            👥 Pacientes
        </li>
        <li>
            ⚙️ Configurações
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
