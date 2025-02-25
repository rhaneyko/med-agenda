import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { createAppointment } from "../services/scheduleService";

const CriacaoAgendamento: React.FC = () => {
  const navigate = useNavigate();

  // Estados para os campos do formulário
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  // Estados para feedback (erro/sucesso)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validação dos campos
    if (!patientName || !doctor || !date || !time || !reason) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Cria o agendamento usando o serviço
      await createAppointment({
        patientName,
        doctor,
        date,
        time,
        reason,
      });

      setSuccess("Agendamento criado com sucesso!");

      // Limpa o formulário
      setPatientName("");
      setDoctor("");
      setDate("");
      setTime("");
      setReason("");

      // Redireciona para a página inicial após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      setError("Erro ao criar agendamento. Tente novamente.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>📅 Criar Novo Agendamento</h2>
      <p>Preencha os campos abaixo para agendar uma consulta.</p>

      {/* Mensagens de erro/sucesso */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Formulário de criação de agendamento */}
      <Form onSubmit={handleSubmit}>
        {/* Nome do Paciente */}
        <Form.Group className="mb-3">
          <Form.Label>👤 Nome do Paciente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do paciente"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Médico */}
        <Form.Group className="mb-3">
          <Form.Label>🩺 Médico</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do médico"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
        </Form.Group>

        {/* Data */}
        <Form.Group className="mb-3">
          <Form.Label>📅 Data</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        {/* Horário */}
        <Form.Group className="mb-3">
          <Form.Label>⏰ Horário</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        {/* Motivo da Consulta */}
        <Form.Group className="mb-3">
          <Form.Label>📝 Motivo da Consulta</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descreva o motivo da consulta"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>

        {/* Botão de Envio */}
        <Button variant="primary" type="submit">
          📌 Criar Agendamento
        </Button>
      </Form>
    </Container>
  );
};

export default CriacaoAgendamento;