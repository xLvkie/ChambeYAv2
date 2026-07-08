import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

// Función para actualizar cualquier perfil (Postulante o Empleador)
export const actualizarPerfilUsuario = async (uid: string, datosNuevos: any) => {
  try {
    // Apuntamos al documento exacto del usuario usando su UID
    const userRef = doc(db, "usuarios", uid);
    
    // updateDoc solo actualiza los campos que le pasamos, sin borrar el resto (como el email o el rol)
    await updateDoc(userRef, {
      ...datosNuevos,
      perfilCompleto: true, // ¡Esta es la llave que abre el bloqueo del Guardián!
      fechaActualizacion: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error al actualizar la base de datos:", error);
    throw error;
  }
};