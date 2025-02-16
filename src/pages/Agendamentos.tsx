import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { createAppointment, getAppointments } from "../services/scheduleService";
import { Container, Form, Button, Alert, Table } from "react-bootstrap";

interface Appointment {
  id?: string;
  userId: string;
  patientName: string; // Novo campo: Nome do Paciente
  userName: string;
  userEmail: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const Agendamentos: React.FC = () => {
  const { user } = useAuth();
  const [patientName, setPatientName] = useState(""); // Novo estado
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data as Appointment[]);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar agendamentos.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!patientName || !doctor || !date || !time || !reason) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      await createAppointment({
        userId: user?.uid || "",
        patientName,
        userName: user?.email || "Anônimo",
        userEmail: user?.email || "",
        doctor,
        date,
        time,
        reason,
      });

      setSuccess("✅ Agendamento criado com sucesso!");
      setPatientName("");
      setDoctor("");
      setDate("");
      setTime("");
      setReason("");

      fetchAppointments();
    } catch (error) {
      setError("Erro ao criar agendamento.");
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>📅 Criar Agendamento</h2>
      <p>Preencha as informações abaixo para agendar uma consulta.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>👤 Nome do Paciente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do paciente"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>🩺 Médico</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do médico"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>📅 Data</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>⏰ Horário</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>📝 Motivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descreva o motivo da consulta"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          📌 Criar Agendamento
        </Button>
      </Form>

      {/* Lista de Agendamentos */}
      <h3 className="mt-5">📋 Meus Agendamentos</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Médico</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt, index) => (
              <tr key={appt.id || index}> {/* Use o índice como fallback */}
                <td>{appt.patientName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.doctor}</td>
                <td>{appt.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Nenhum agendamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Agendamentos;
