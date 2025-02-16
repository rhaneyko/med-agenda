import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Importa NavLink
import { useAuth } from "../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login"; // Redireciona para login após logout
  };

  return (
    <div className="d-flex">
      {/* Botão Hambúrguer */}
      <button
        className="btn btn-primary m-3 position-absolute"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1000 }}
      >
        ☰
      </button>

      <div
        className={`d-flex flex-column p-3 bg-light ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
        style={{
          width: isOpen ? "250px" : "0",
          height: "100vh",
          overflow: "hidden",
          transition: "width 0.3s ease",
        }}
      >
        {isOpen && (
          <>
            <h4 className="text-center ms-4 mt-2">Med-Agenda</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-dark" activeClassName="active">
                  🏠 Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/agendamentos" className="nav-link text-dark" activeClassName="active">
                  📅 Agendamentos
                </NavLink>
              </li>
              {user?.userType === "admin" && (
                <li>
                  <NavLink to="/configuracoes" className="nav-link text-dark" activeClassName="active">
                    ⚙️ Configurações
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Botão de Logout */}
            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
              🚪 Sair
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
