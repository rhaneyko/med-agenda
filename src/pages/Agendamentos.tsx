import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/authContext";
import { getAppointments, updateAppointment, deleteAppointment } from "../services/scheduleService";
import { Container, Form, Button, Alert, Table, Modal } from "react-bootstrap";

import { FcCalendar } from "react-icons/fc"

interface Appointment {
  id?: string;
  userId: string;
  patientName: string;
  userName: string;
  userEmail: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

const Agendamentos: React.FC = () => {
  // const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar agendamentos.");
    }
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await deleteAppointment(id);
        setSuccess("Agendamento cancelado com sucesso!");
        fetchAppointments();
      } catch {
        setError("Erro ao cancelar agendamento.");
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      await updateAppointment(selectedAppointment.id as string, selectedAppointment);
      setSuccess("Agendamento atualizado com sucesso!");
      setShowModal(false);
      fetchAppointments();
    } catch {
      setError("Erro ao atualizar agendamento.");
    }
  };

  return (
    <Container className="mt-4">
      <h2><FcCalendar /> Meus Agendamentos</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Médico</th>
            <th>Motivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.patientName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.doctor}</td>
                <td>{appt.reason}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(appt)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(appt.id as string)}>
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                Nenhum agendamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <Form.Group>
                <Form.Label>Nome do Paciente</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAppointment.patientName}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, patientName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedAppointment.date}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, date: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  value={selectedAppointment.time}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, time: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleUpdate}>Salvar Alterações</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Agendamentos;
