// src/services/authService.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

interface UserData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  tipoUsuario: string;
}

// Registrar usuário e salvar no Firestore
export const registerUserWithRole = async (userData: UserData) => {
  const { nome, cpf, email, senha, tipoUsuario } = userData;

  // Criar usuário no Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  const user = userCredential.user;

  // Criar documento no Firestore
  await setDoc(doc(db, "users", user.uid), {
    nome,
    cpf,
    email,
    userType: tipoUsuario,
    createdAt: new Date(),
  });
};