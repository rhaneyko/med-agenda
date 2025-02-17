import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { getAppointments, finalizeAppointment, cancelAppointment } from "../services/scheduleService";
import { format } from "date-fns";

import { FcCalendar, FcManager, FcPlanner, FcClock, FcDocument } from "react-icons/fc";

interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status?: "finalizada";
}

const Home: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<number>(0);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      // Ordenar todas as consultas por data e horário (menor para maior)
      const sortedAppointments = data.sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      );
      setAppointments(sortedAppointments);

      // Data de hoje no formato correto
      const todayDate = format(new Date(), "yyyy-MM-dd");

      // Filtrar apenas consultas de hoje que ainda não foram finalizadas
      const todayList = sortedAppointments
        .filter((appt) => appt.date === todayDate && appt.status !== "finalizada")
        .sort((a, b) => a.time.localeCompare(b.time));

      setTodayAppointments(todayList);

      // Atualizar total de consultas finalizadas
      const completed = sortedAppointments.filter((appt) => appt.status === "finalizada").length;
      setCompletedAppointments(completed);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  const handleFinalize = async (appointmentId: string) => {
    await finalizeAppointment(appointmentId);
    fetchAppointments();
  };

  const handleCancel = async (appointmentId: string) => {
    if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      await cancelAppointment(appointmentId);
      fetchAppointments();
    }
  };

  return (
    <Container fluid className="p-4">
      <h2>Bem-vindo ao Med Agenda</h2>
      <p>Gerencie seus agendamentos médicos de forma simples e eficiente.</p>

      {/* Cards Resumo */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title><FcCalendar /> Consultas Hoje</Card.Title>
              <Card.Text>{todayAppointments.length} agendamentos</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title><FcManager /> Pacientes Atendidos</Card.Title>
              <Card.Text>{completedAppointments} atendimentos finalizados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lista de Próximas Consultas */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title><FcPlanner /> Próximas Consultas</Card.Title>
          <ListGroup variant="flush">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appt) => (
                <ListGroup.Item key={appt.id}>
                  <FcClock /> {appt.time} - {appt.patientName} ({appt.doctor})
                  
                  <Button variant="success" size="sm" className="ms-2" onClick={() => handleFinalize(appt.id)}>
                    ✔ Finalizar
                  </Button>
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => handleCancel(appt.id)}>
                    ❌ Cancelar
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Nenhuma consulta agendada para hoje.</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Todas as Consultas */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title><FcDocument /> Todas as Consultas</Card.Title>
          <ListGroup variant="flush">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <ListGroup.Item key={appt.id}>
                  <FcClock /> {appt.date} - {appt.time} | {appt.patientName} ({appt.doctor})
                  {appt.status === "finalizada" && <strong> ✅ Finalizada</strong>}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Nenhuma consulta agendada.</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Atalhos Rápidos */}
      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title><FcCalendar /> Novo Agendamento</Card.Title>
              <Card.Text>Agende uma nova consulta rapidamente.</Card.Text>
              <a href="/agendamentos" className="btn btn-primary">Agendar</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
