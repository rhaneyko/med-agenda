import React, { useState } from "react";
import { useNavigate } from "react-router"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário autenticado:", userCredential.user);

      // Aguarda o AuthContext atualizar e redireciona
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError("❌ Erro ao fazer login. Verifique seu email e senha.");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow-sm">
        <h2 className="text-center">🔐 Login</h2>
        <p className="text-center">Acesse sua conta para continuar</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
