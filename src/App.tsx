// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import Configuracoes from "./pages/Configuracoes";
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtecdedRoute";
import CriacaoAgendamento from "./pages/CriacaoAgendamento";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/criar-agendamento" element={<CriacaoAgendamento />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
