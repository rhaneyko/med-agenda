import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { getUsers, updateUser, deleteUser } from "../services/userService";
// import { useAuth } from "../context/authContext";

import { FcSettings } from "react-icons/fc";

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

const Configuracoes: React.FC = () => {
  // const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados para edição de usuário
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedUserType, setEditedUserType] = useState("");

  // Estados para exclusão de usuário
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError("Erro ao carregar usuários.");
      console.error(error);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedUserType(user.userType);
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, { name: editedName, userType: editedUserType });
      setSuccess("Usuário atualizado com sucesso!");
      setShowEditModal(false);
      fetchUsers();
    } catch {
      setError("Erro ao atualizar usuário.");
    }
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      await deleteUser(deleteUserId);
      setSuccess("Usuário excluído com sucesso!");
      setShowDeleteModal(false);
      fetchUsers();
    } catch {
      setError("Erro ao excluir usuário.");
    }
  };

  return (
    <Container className="mt-4">
      <h2><FcSettings /> Configurações</h2>
      <p>Aqui você pode visualizar e gerenciar os usuários cadastrados.</p>

      <div className="mb-3">
        <a href="/registrar" className="btn btn-primary">Criar Novo Usuário</a>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo de Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(user)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(user.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Edição */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tipo de Usuário</Form.Label>
              <Form.Select value={editedUserType} onChange={(e) => setEditedUserType(e.target.value)}>
                <option value="medico">Médico</option>
                <option value="secretario">Secretário(a)</option>
                <option value="administrador">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleUpdateUser}>Salvar Alterações</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este usuário?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Configuracoes;
