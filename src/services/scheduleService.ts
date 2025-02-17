import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Appointment {
  id: string;
  userId: string;
  patientName: string;
  userName: string;
  userEmail: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  createdAt: Timestamp;
  status?: "finalizada";
}

// Criar um novo agendamento
export const createAppointment = async (appointment: Omit<Appointment, "createdAt">) => {
  try {
    const appointmentData = {
      ...appointment,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "appointments"), appointmentData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw new Error("Erro ao criar o agendamento.");
  }
};

// Buscar todos os agendamentos
export const getAppointments = async () => {
  try {
    const appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(appointmentsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Appointment[];
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw new Error("Erro ao buscar agendamentos.");
  }
};

// Editar um agendamento
export const updateAppointment = async (id: string, updatedData: Partial<Appointment>) => {
  try {
    const appointmentRef = doc(db, "appointments", id);
    await updateDoc(appointmentRef, updatedData);
    console.log("Agendamento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    throw new Error("Erro ao atualizar o agendamento.");
  }
};

// Excluir um agendamento
export const deleteAppointment = async (id: string) => {
  try {
    const appointmentRef = doc(db, "appointments", id);
    await deleteDoc(appointmentRef);
    console.log("Agendamento excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    throw new Error("Erro ao excluir o agendamento.");
  }
};

// Finalizar consulta
export const finalizeAppointment = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, { status: "finalizada" });
  } catch (error) {
    console.error("Erro ao finalizar consulta:", error);
    throw new Error("Erro ao finalizar consulta.");
  }
};

// Cancelar consulta
export const cancelAppointment = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error("Erro ao cancelar consulta:", error);
    throw new Error("Erro ao cancelar consulta.");
  }
};