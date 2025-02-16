// src/services/scheduleService.ts
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Appointment {
  id: string; // Campo id adicionado
  userId: string;
  patientName: string;
  userName: string;
  userEmail: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  createdAt: Timestamp;
}

// Criar um novo agendamento
export const createAppointment = async (appointment: Omit<Appointment, "createdAt" | "id">) => {
  try {
    const appointmentData = {
      ...appointment,
      createdAt: Timestamp.now(), // Adiciona a data do agendamento
    };

    const docRef = await addDoc(collection(db, "appointments"), appointmentData);
    console.log("Agendamento criado com sucesso! ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw new Error("Erro ao criar o agendamento.");
  }
};

// Buscar todos os agendamentos
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(appointmentsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Inclui o id do documento
      userId: doc.data().userId,
      patientName: doc.data().patientName,
      userName: doc.data().userName,
      userEmail: doc.data().userEmail,
      doctor: doc.data().doctor,
      date: doc.data().date,
      time: doc.data().time,
      reason: doc.data().reason,
      createdAt: doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw new Error("Erro ao buscar agendamentos.");
  }
};