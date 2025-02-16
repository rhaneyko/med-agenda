import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { getAppointments } from "../services/scheduleService";
import { format } from "date-fns";

interface Appointment {
  id?: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const Home: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<number>(0);
  const [pendingAppointments, setPendingAppointments] = useState<number>(0);

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
  
      // Filtrar consultas de hoje e ordenar pelo horário
      const todayList = sortedAppointments
        .filter((appt) => appt.date === todayDate)
        .sort((a, b) => a.time.localeCompare(b.time));
  
      setTodayAppointments(todayList);
  
      // Definir consultas finalizadas e pendentes (Simulação)
      setCompletedAppointments(Math.floor(todayList.length / 2));
      setPendingAppointments(todayList.length - Math.floor(todayList.length / 2));
  
      console.log("Todas as consultas ordenadas:", sortedAppointments);
      console.log("Consultas de hoje ordenadas:", todayList);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };
  
  
  return (
    <Container fluid className="p-4">
      <h2>🏥 Bem-vindo ao Med-Agenda</h2>
      <p>Gerencie seus agendamentos médicos de forma simples e eficiente.</p>

      {/* Cards Resumo */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>📅 Consultas Hoje</Card.Title>
              <Card.Text>{todayAppointments.length} agendamentos</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>👥 Pacientes Atendidos</Card.Title>
              <Card.Text>{completedAppointments} atendimentos finalizados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>⏳ Consultas Pendentes</Card.Title>
              <Card.Text>{pendingAppointments} consultas aguardando</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lista de Próximas Consultas */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>🔔 Próximas Consultas</Card.Title>
          <ListGroup variant="flush">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appt) => (
                <ListGroup.Item key={appt.id}>
                  🕒 {appt.time} - {appt.patientName} ({appt.doctor})
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Nenhuma consulta agendada para hoje.</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>📋 Todas as Consultas</Card.Title>
          <ListGroup variant="flush">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <ListGroup.Item key={appt.id}>
                  🕒 {appt.date} - {appt.time} | {appt.patientName} ({appt.doctor})
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
              <Card.Title>📅 Novo Agendamento</Card.Title>
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
