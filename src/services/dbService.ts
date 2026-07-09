import { db } from "./firebase";
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, updateDoc,
          query, where, getDocs, increment, arrayUnion, arrayRemove, orderBy
        } from "firebase/firestore";

export interface Calificacion {
  id?: string;
  empresaId: string;
  empresaNombre: string;
  postulanteId: string;
  postulanteNombre: string;
  vacanteId: string;
  cargo: string;
  puntaje: number;
  comentario: string;
  fecha?: any;
}

export interface EmpresaCalificable {
  empresaId: string;
  empresaNombre: string;
  vacanteId: string;
  cargoPostulado: string;
}

export interface ResumenEmpresa {
  promedio: number;
  cantidadOpiniones: number;
  estrellas: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/*================================
 FUNCIONALIDADES DE LOGIN/REGISTRO
=================================*/ 

export const actualizarPerfilUsuario = async (uid: string, datosNuevos: any) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    
    await updateDoc(userRef, {
      ...datosNuevos,
      perfilCompleto: true, 
      fechaActualizacion: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error al actualizar la base de datos:", error);
    throw error;
  }
};

/*===========================
 FUNCIONALIDADES DE VACANTES
============================*/ 

// Función para crear una nueva vacante
export const crearVacante = async (datosVacante: any) => {
  try {
    // Apuntamos a la colección "vacantes" (Firebase la creará automáticamente si no existe)
    const vacantesRef = collection(db, "vacantes");
    
    // addDoc crea un nuevo documento con un ID único autogenerado
    const docRef = await addDoc(vacantesRef, {
      ...datosVacante,
      estado: 'activa', // Toda vacante nueva nace como 'activa'
      fechaCreacion: serverTimestamp() // Registra la hora exacta del servidor de Google
    });
    
    return docRef.id; // Devolvemos el ID por si necesitamos redirigir al usuario a la vista de la vacante
  } catch (error) {
    console.error("Error al crear la vacante:", error);
    throw error;
  }
};

// Función para traer solo las vacantes de un empleador en específico
export const obtenerVacantesPorEmpleador = async (empleadorId: string) => {
  try {
    const vacantesRef = collection(db, "vacantes");
    const q = query(vacantesRef, where("empleadorId", "==", empleadorId));
    
    const querySnapshot = await getDocs(q);
    const vacantes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      vacantes.push({ id: doc.id, ...doc.data() });
    });
    
    return vacantes.sort((a, b) => b.fechaCreacion?.toMillis() - a.fechaCreacion?.toMillis());
  } catch (error) {
    console.error("Error al obtener las vacantes:", error);
    throw error;
  }
};

// Función para actualizar cualquier dato de una vacante (como su estado)
export const actualizarVacante = async (vacanteId: string, datosActualizados: any) => {
  try {
    const vacanteRef = doc(db, "vacantes", vacanteId);
    await updateDoc(vacanteRef, datosActualizados);
  } catch (error) {
    console.error("Error al actualizar la vacante:", error);
    throw error;
  }
};

// Función para obtener una sola vacante por su ID
export const obtenerVacantePorId = async (id: string) => {
  try {
    const docRef = doc(db, "vacantes", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("La vacante no existe");
    }
  } catch (error) {
    console.error("Error al obtener la vacante:", error);
    throw error;
  }
};

export const obtenerEmpresasCalificables = async (postulanteId: string): Promise<EmpresaCalificable[]> => {
  try {
    const postulacionesRef = collection(db, "postulaciones");
    const q = query(postulacionesRef, where("postulanteId", "==", postulanteId));
    const querySnapshot = await getDocs(q);

    const empresasMap = new Map<string, EmpresaCalificable>();

    for (const postulacionDoc of querySnapshot.docs) {
      const data = postulacionDoc.data() as any;
      const empresaId = data.empleadorId || data.empresaId;
      const vacanteId = data.vacanteId || "";
      const cargoPostulado = data.cargoPostulado || data.cargo || "";
      let empresaNombre = data.nombreEmpresa || data.empresaNombre || "";

      if (!empresaId) {
        continue;
      }

      if (!empresaNombre && vacanteId) {
        try {
          const vacanteDoc = await getDoc(doc(db, "vacantes", vacanteId));
          if (vacanteDoc.exists()) {
            empresaNombre = (vacanteDoc.data() as any).nombreEmpresa || empresaNombre;
          }
        } catch (error) {
          console.warn("No se pudo obtener el nombre de la empresa desde la vacante:", error);
        }
      }

      if (!empresasMap.has(empresaId)) {
        empresasMap.set(empresaId, {
          empresaId,
          empresaNombre: empresaNombre || "Empresa desconocida",
          vacanteId,
          cargoPostulado,
        });
      }
    }

    return Array.from(empresasMap.values());
  } catch (error) {
    console.error("Error al obtener empresas calificables:", error);
    throw error;
  }
};

export const registrarCalificacion = async (datos: Omit<Calificacion, 'id' | 'fecha'>) => {
  try {
    const calificacionesRef = collection(db, "calificaciones");
    const docRef = await addDoc(calificacionesRef, {
      ...datos,
      fecha: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al registrar la calificación:", error);
    throw error;
  }
};

export const actualizarCalificacion = async (calificacionId: string, datos: Partial<Omit<Calificacion, 'id' | 'fecha'>>) => {
  try {
    const calificacionRef = doc(db, "calificaciones", calificacionId);
    await updateDoc(calificacionRef, {
      ...datos,
      fecha: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al actualizar la calificación:", error);
    throw error;
  }
};

export const obtenerCalificacion = async (postulanteId: string, empresaId: string): Promise<Calificacion | null> => {
  try {
    const calificacionesRef = collection(db, "calificaciones");
    const q = query(
      calificacionesRef,
      where("postulanteId", "==", postulanteId),
      where("empresaId", "==", empresaId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...(docSnap.data() as Calificacion) };
  } catch (error) {
    console.error("Error al obtener la calificación:", error);
    throw error;
  }
};

export const obtenerCalificacionesEmpresa = async (empresaId: string): Promise<Calificacion[]> => {
  try {
    const calificacionesRef = collection(db, "calificaciones");
    const q = query(calificacionesRef, where("empresaId", "==", empresaId));
    const querySnapshot = await getDocs(q);

    const calificaciones: Calificacion[] = [];
    querySnapshot.forEach((doc) => {
      calificaciones.push({ id: doc.id, ...(doc.data() as Calificacion) });
    });

    return calificaciones.sort((a, b) => {
      const dateA = a.fecha?.toMillis?.() || new Date(a.fecha || 0).getTime();
      const dateB = b.fecha?.toMillis?.() || new Date(b.fecha || 0).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error al obtener calificaciones de empresa:", error);
    throw error;
  }
};

export const obtenerResumenEmpresa = async (empresaId: string): Promise<ResumenEmpresa> => {
  try {
    const calificaciones = await obtenerCalificacionesEmpresa(empresaId);
    const cantidadOpiniones = calificaciones.length;
    const estrellas = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const sumaTotal = calificaciones.reduce((total, calificacion) => {
      const puntaje = Number.isFinite(calificacion.puntaje) ? calificacion.puntaje : 0;
      const valor = Math.max(1, Math.min(5, puntaje));
      if (valor >= 1 && valor <= 5) {
        estrellas[valor as 1 | 2 | 3 | 4 | 5] += 1;
      }
      return total + valor;
    }, 0);

    const promedio = cantidadOpiniones > 0 ? parseFloat((sumaTotal / cantidadOpiniones).toFixed(1)) : 0;

    return {
      promedio,
      cantidadOpiniones,
      estrellas,
    };
  } catch (error) {
    console.error("Error al obtener el resumen de la empresa:", error);
    throw error;
  }
};

export const obtenerCalificacionesPostulante = async (postulanteId: string): Promise<Calificacion[]> => {
  try {
    const calificacionesRef = collection(db, "calificaciones");
    const q = query(calificacionesRef, where("postulanteId", "==", postulanteId));
    const querySnapshot = await getDocs(q);

    const calificaciones: Calificacion[] = [];
    querySnapshot.forEach((doc) => {
      calificaciones.push({ id: doc.id, ...(doc.data() as Calificacion) });
    });

    return calificaciones.sort((a, b) => {
      const dateA = a.fecha?.toMillis?.() || new Date(a.fecha || 0).getTime();
      const dateB = b.fecha?.toMillis?.() || new Date(b.fecha || 0).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error al obtener calificaciones del postulante:", error);
    throw error;
  }
};

/*=======================================
 FUNCIONALIDADES DEl BUSCADOR DE VACANTES
========================================*/ 

// Función para traer todas las vacantes activas de la plataforma 
export const obtenerTodasLasVacantesActivas = async () => {
  try {
    const vacantesRef = collection(db, "vacantes");
    // Buscamos solo las que el empleador tiene como "activa"
    const q = query(vacantesRef, where("estado", "==", "activa"));
    
    const querySnapshot = await getDocs(q);
    const vacantes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      vacantes.push({ id: doc.id, ...doc.data() });
    });
    
    // Las ordenamos para que las más recientes salgan primero
    return vacantes.sort((a, b) => {
      const timeA = a.fechaCreacion?.toMillis() || 0;
      const timeB = b.fechaCreacion?.toMillis() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error al obtener todas las vacantes activas:", error);
    throw error;
  }
};

/*=====================================================================
 FUNCIONALIDADES DE RECUENTO DE DATOS DE LAS VACANTES Y DETALLE VACANTE
=====================================================================*/ 

// 1. Vistas únicas
export const registrarVistaVacante = async (vacanteId: string, userId: string) => {
  try {
    if (!userId) return;
    const vacanteRef = doc(db, "vacantes", vacanteId);
    // arrayUnion añade el ID solo si no existe en la lista
    await updateDoc(vacanteRef, {
      vistasUnicas: arrayUnion(userId)
    });
  } catch (error) {
    console.error("Error al registrar la vista:", error);
  }
};

// 2. Postulaciones únicas
export const registrarPostulacion = async (vacanteId: string, userId: string) => {
  try {
    if (!userId) return;
    const vacanteRef = doc(db, "vacantes", vacanteId);
    await updateDoc(vacanteRef, {
      postulantesUnicos: arrayUnion(userId)
    });
  } catch (error) {
    console.error("Error al registrar postulación:", error);
  }
};

// 3. Buscar perfil extra del empleador (para el RUC y Tamaño)
export const obtenerPerfilUsuario = async (userId: string) => {
  try {
    // Busca en la colección donde guardas a los usuarios (asumo "usuarios")
    const docRef = doc(db, "usuarios", userId); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  } catch (error) {
    console.error("Error al obtener perfil del empleador:", error);
    return null;
  }
};

/*=======================================
 FUNCIONALIDADES DE GESTIÓN DE CANDIDATOS
=======================================*/ 

// 1. Función para obtener todas las postulaciones dirigidas a un empleador específico
export const obtenerPostulacionesPorEmpleador = async (empleadorId: string) => {
  try {
    const postulacionesRef = collection(db, "postulaciones");
    const q = query(postulacionesRef, where("empleadorId", "==", empleadorId));
    const querySnapshot = await getDocs(q);
    
    const postulaciones: any[] = [];
    querySnapshot.forEach((doc) => {
      postulaciones.push({ id: doc.id, ...doc.data() });
    });
    
    return postulaciones.sort((a, b) => b.fecha?.toMillis() - a.fecha?.toMillis());
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    return [];
  }
};

// 2. Función para actualizar el estado del candidato en el embudo
export const actualizarEstadoPostulacion = async (postulacionId: string, nuevoEstado: string) => {
  try {
    const docRef = doc(db, "postulaciones", postulacionId);
    await updateDoc(docRef, { estado: nuevoEstado });
  } catch (error) {
    console.error("Error al actualizar el estado de la postulación:", error);
    throw error;
  }
};

// 3. Función para registrar una postulación real (cuando un candidato aplica a una vacante)
export const registrarPostulacionReal = async (datosPostulacion: any) => {
  try {
    const postRef = collection(db, "postulaciones");
    await addDoc(postRef, {
      ...datosPostulacion,
      estado: 'Nuevo', 
      fecha: serverTimestamp()
    });

    await registrarPostulacion(datosPostulacion.vacanteId, datosPostulacion.postulanteId);
    
    return true;
  } catch (error) {
    console.error("Error al postular:", error);
    throw error;
  }
};

/*=======================================
 FUNCIONALIDADES DEl PERFIL DEL CANDIDATO
========================================*/ 

// 1. Función para cambiar el estado de la postulación

// 2. Función para obtener el documento de postulación (donde está el estado)
export const obtenerPostulacion = async (postulacionId: string) => {
  const docSnap = await getDoc(doc(db, "postulaciones", postulacionId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};


