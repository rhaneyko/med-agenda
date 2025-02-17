import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

// Buscar tipo de usuário do Firestore
const getUserType = async (): Promise<string | null> => {
  if (!auth.currentUser) return null;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() ? userSnap.data().userType : null;
};

// Buscar todos os usuários (somente se for administrador)
export const getUsers = async (): Promise<User[]> => {
    try {
      const userType = await getUserType();
  
      if (userType !== "administrador") {
        throw new Error("Acesso negado: apenas administradores podem ver usuários.");
      }
  
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao buscar usuários:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Erro desconhecido ao buscar usuários.");
        throw new Error("Erro desconhecido ao buscar usuários.");
      }
    }
  };

  export const updateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      throw new Error("Erro ao editar usuário.");
    }
  };
  
  // Excluir um usuário
  export const deleteUser = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw new Error("Erro ao excluir usuário.");
    }
  };
  
