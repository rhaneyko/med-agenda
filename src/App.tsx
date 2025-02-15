// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import Pacientes from "./pages/Pacientes";
import Configuracoes from "./pages/Configuracoes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agendamentos" element={<Agendamentos />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
