import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";


interface AppointmentInput {
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status?: "finalizada";
}

interface Appointment extends AppointmentInput {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: Timestamp;
}

// Criar um novo agendamento
export const createAppointment = async (appointment: AppointmentInput) => {
  try {
    const user = auth.currentUser; // Obtém o usuário logado

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    // Adiciona campos gerados automaticamente
    const appointmentData: Appointment = {
      ...appointment,
      id: "", // O Firestore gerará o ID automaticamente
      userId: user.uid,
      userName: user.displayName || "Anônimo",
      userEmail: user.email || "",
      createdAt: Timestamp.now(),
    };

    // Salva no Firestore
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

    const appointments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const appointment = {
        ...data,
        id: doc.id ?? "ID Não Encontrado",
      };
      return appointment;
    }) as Appointment[];

    return appointments;
  } catch {
    throw new Error("Erro ao buscar agendamentos.");
  }
};



// Editar um agendamento
export const updateAppointment = async (id: string, updatedData: Partial<Appointment>) => {
  try {
    const appointmentRef = doc(db, "appointments", id);
    await updateDoc(appointmentRef, updatedData);
  } catch {
    throw new Error("Erro ao atualizar o agendamento.");
  }
};

// Excluir um agendamento
export const deleteAppointment = async (id: string) => {
  try {
    const appointmentRef = doc(db, "appointments", id);
    await deleteDoc(appointmentRef);
  } catch {
    throw new Error("Erro ao excluir o agendamento.");
  }
};

// Finalizar consulta
export const finalizeAppointment = async (appointmentId: string) => {
  try {
    if (!appointmentId) {
      throw new Error("ID do agendamento inválido.");
    }

    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, { status: "finalizada" });
  } catch {
    throw new Error("Erro ao finalizar consulta.");
  }
};

// Cancelar consulta
export const cancelAppointment = async (appointmentId: string) => {
  try {
    if (!appointmentId) {
      throw new Error("ID do agendamento inválido.");
    }

    const appointmentRef = doc(db, "appointments", appointmentId);
    await deleteDoc(appointmentRef);
  } catch {
    throw new Error("Erro ao cancelar consulta.");
  }
};