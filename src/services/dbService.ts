import { db } from "./firebase";
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, updateDoc,
          query, where, getDocs, increment, arrayUnion, arrayRemove, orderBy
        } from "firebase/firestore";

export interface Calificacion {
  id?: string;
  tipo?: 'postulante_a_empresa' | 'empresa_a_postulante'; 
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

export interface TrabajadorCalificable {
  postulanteId: string;
  postulanteNombre: string;
  vacanteId: string;
  cargo: string;
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

export const crearVacante = async (datosVacante: any) => {
  try {
    const vacantesRef = collection(db, "vacantes");
    const docRef = await addDoc(vacantesRef, {
      ...datosVacante,
      estado: 'activa',
      fechaCreacion: serverTimestamp() 
    });
    return docRef.id; 
  } catch (error) {
    console.error("Error al crear la vacante:", error);
    throw error;
  }
};

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

export const actualizarVacante = async (vacanteId: string, datosActualizados: any) => {
  try {
    const vacanteRef = doc(db, "vacantes", vacanteId);
    await updateDoc(vacanteRef, datosActualizados);
  } catch (error) {
    console.error("Error al actualizar la vacante:", error);
    throw error;
  }
};

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

export const obtenerPostulantesCalificables = async (empleadorId: string): Promise<TrabajadorCalificable[]> => {
  try {
    const postulacionesRef = collection(db, "postulaciones");
    const q = query(postulacionesRef, where("empleadorId", "==", empleadorId));
    const querySnapshot = await getDocs(q);

    const trabajadoresMap = new Map<string, TrabajadorCalificable>();

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data() as any;
      const postulanteId = data.postulanteId;
      const cargo = data.cargoPostulado || data.cargo || "Trabajador";

      if (!postulanteId) continue;

      let postulanteNombre = data.nombreCandidato || data.postulanteNombre || "";

      if (!postulanteNombre) {
        try {
          const userDoc = await getDoc(doc(db, "usuarios", postulanteId));
          if (userDoc.exists()) {
             postulanteNombre = (userDoc.data() as any).nombre || "Candidato";
          }
        } catch (error) {
          console.warn("No se pudo obtener el nombre del candidato", error);
        }
      }

      if (!trabajadoresMap.has(postulanteId)) {
        trabajadoresMap.set(postulanteId, {
          postulanteId,
          postulanteNombre: postulanteNombre || "Candidato",
          vacanteId: data.vacanteId || "",
          cargo,
        });
      }
    }
    return Array.from(trabajadoresMap.values());
  } catch (error) {
    console.error("Error al obtener postulantes calificables:", error);
    return [];
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

export const obtenerCalificacion = async (postulanteId: string, empresaId: string, tipo: string): Promise<Calificacion | null> => {
  try {
    const calificacionesRef = collection(db, "calificaciones");
    const q = query(
      calificacionesRef,
      where("postulanteId", "==", postulanteId),
      where("empresaId", "==", empresaId),
      where("tipo", "==", tipo) 
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
    // Añadimos el filtro de TIPO
    const q = query(
      calificacionesRef, 
      where("empresaId", "==", empresaId),
      where("tipo", "==", "postulante_a_empresa") 
    );
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
    // Añadimos el filtro de TIPO
    const q = query(
      calificacionesRef, 
      where("postulanteId", "==", postulanteId),
      where("tipo", "==", "empresa_a_postulante")
    );
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

export const obtenerTodasLasVacantesActivas = async () => {
  try {
    const vacantesRef = collection(db, "vacantes");
    const q = query(vacantesRef, where("estado", "==", "activa"));
    
    const querySnapshot = await getDocs(q);
    const vacantes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      vacantes.push({ id: doc.id, ...doc.data() });
    });
    
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

export const registrarVistaVacante = async (vacanteId: string, userId: string) => {
  try {
    if (!userId) return;
    const vacanteRef = doc(db, "vacantes", vacanteId);
    await updateDoc(vacanteRef, {
      vistasUnicas: arrayUnion(userId)
    });
  } catch (error) {
    console.error("Error al registrar la vista:", error);
  }
};

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

export const obtenerPerfilUsuario = async (userId: string) => {
  try {
    const docRef = doc(db, "usuarios", userId); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  } catch (error) {
    console.error("Error al obtener perfil del empleador:", error);
    return null;
  }
};

export const registrarVistaPerfil = async (postulanteId: string, empleadorId: string) => {
  try {
    if (!empleadorId || !postulanteId) return;
    const userRef = doc(db, "usuarios", postulanteId);
    
    // arrayUnion agrega el ID solo si no existe previamente
    await updateDoc(userRef, {
      vistasPerfil: arrayUnion(empleadorId)
    });
  } catch (error) {
    console.error("Error al registrar la vista del perfil:", error);
  }
};

/*=======================================
 FUNCIONALIDADES DE GESTIÓN DE CANDIDATOS
=======================================*/ 

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

export const actualizarEstadoPostulacion = async (postulacionId: string, nuevoEstado: string) => {
  try {
    const docRef = doc(db, "postulaciones", postulacionId);
    await updateDoc(docRef, { estado: nuevoEstado });
  } catch (error) {
    console.error("Error al actualizar el estado de la postulación:", error);
    throw error;
  }
};

export const registrarPostulacionReal = async (datosPostulacion: any) => {
  try {
    const postRef = collection(db, "postulaciones");
    const docRef = await addDoc(postRef, {
      ...datosPostulacion,
      estado: 'Nuevo', 
      fecha: serverTimestamp()
    });

    await registrarPostulacion(datosPostulacion.vacanteId, datosPostulacion.postulanteId);
    
    await iniciarChatPostulacion(datosPostulacion);

    return true;
  } catch (error) {
    console.error("Error al postular:", error);
    throw error;
  }
};

/*=======================================
 FUNCIONALIDADES DEL PERFIL DEL CANDIDATO
========================================*/ 

export const obtenerPostulacion = async (postulacionId: string) => {
  const docSnap = await getDoc(doc(db, "postulaciones", postulacionId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const obtenerPostulacionesPorPostulante = async (postulanteId: string) => {
  try {
    // 1. Buscamos todas las postulaciones del usuario
    const postulacionesRef = collection(db, "postulaciones");
    const q = query(postulacionesRef, where("postulanteId", "==", postulanteId));
    const querySnapshot = await getDocs(q);

    const postulaciones: any[] = [];
    
    // 2. Por cada postulación, buscamos los datos de la vacante original
    for (const docSnap of querySnapshot.docs) {
      const dataPostulacion = docSnap.data();
      let datosVacante = {};

      if (dataPostulacion.vacanteId) {
        const vacanteDoc = await getDoc(doc(db, "vacantes", dataPostulacion.vacanteId));
        if (vacanteDoc.exists()) {
          datosVacante = vacanteDoc.data();
        }
      }

      postulaciones.push({
        id: docSnap.id,
        ...dataPostulacion,
        vacante: datosVacante
      });
    }

    // 3. Ordenamos de la más reciente a la más antigua
    return postulaciones.sort((a, b) => {
      const timeA = a.fecha?.toMillis() || 0;
      const timeB = b.fecha?.toMillis() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error al obtener las postulaciones del candidato:", error);
    return [];
  }
};

/*=======================================
 FUNCIONALIDADES DE MENSAJERÍA (CHATS)
========================================*/ 

// 1. Inicia el chat bloqueado cuando el candidato postula
export const iniciarChatPostulacion = async (datosPostulacion: any) => {
  try {
    const mensajeInicial = `Hola, he postulado a la vacante de ${datosPostulacion.cargoPostulado}. ¡Espero su pronta respuesta!`;
    
    // Creamos la sala de chat
    const chatRef = collection(db, "chats");
    const nuevoChat = await addDoc(chatRef, {
      participantes: [datosPostulacion.empleadorId, datosPostulacion.postulanteId],
      vacanteId: datosPostulacion.vacanteId,
      estado: 'pendiente', // Bloqueado para el postulante
      ultimoMensaje: mensajeInicial,
      fechaActualizacion: serverTimestamp(),
      noLeidos: {
        [datosPostulacion.empleadorId]: 1,
        [datosPostulacion.postulanteId]: 0
      }
    });

    // Guardamos el primer mensaje :v
    const mensajesRef = collection(db, "mensajes");
    await addDoc(mensajesRef, {
      chatId: nuevoChat.id,
      remitenteId: datosPostulacion.postulanteId,
      texto: mensajeInicial,
      fecha: serverTimestamp()
    });

    return nuevoChat.id;
  } catch (error) {
    console.error("Error al iniciar chat de postulación:", error);
    throw error;
  }
};

// 2. Desbloquea el chat cuando el empleador da clic en "Contactar"
export const activarChatEmpleador = async (chatId: string, empleadorId: string) => {
  try {
    const mensajeActivacion = "¡Hola! Hemos revisado tu perfil y nos gustaría conversar contigo sobre la vacante.";

    // Actualizamos el estado del chat a 'activo'
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      estado: 'activo',
      ultimoMensaje: mensajeActivacion,
      fechaActualizacion: serverTimestamp()
    });

    // Agregamos el mensaje del empleador
    const mensajesRef = collection(db, "mensajes");
    await addDoc(mensajesRef, {
      chatId: chatId,
      remitenteId: empleadorId,
      texto: mensajeActivacion,
      fecha: serverTimestamp()
    });

  } catch (error) {
    console.error("Error al activar chat:", error);
    throw error;
  }
};

// 3. Enviar un mensaje normal (solo funcionará si el chat está activo)
export const enviarMensaje = async (chatId: string, remitenteId: string, receptorId: string, texto: string) => {
  try {
    const mensajesRef = collection(db, "mensajes");
    await addDoc(mensajesRef, {
      chatId,
      remitenteId,
      texto,
      fecha: serverTimestamp()
    });

    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      ultimoMensaje: texto,
      fechaActualizacion: serverTimestamp(),
      // Usamos increment(1) para sumar 1 al contador del receptor dinámicamente
      [`noLeidos.${receptorId}`]: increment(1)
    });

  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    throw error;
  }
};

// 4. Buscar una sala de chat específica entre dos usuarios para una vacante (Para evitar duplicados)
export const obtenerChatEspecifico = async (empleadorId: string, postulanteId: string, vacanteId: string) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, 
      where("participantes", "array-contains", postulanteId),
      where("vacanteId", "==", vacanteId)
    );
    
    const querySnapshot = await getDocs(q);
    let chatEncontrado = null;

    // Filtramos manualmente para asegurar que el empleador también esté
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participantes.includes(empleadorId)) {
        chatEncontrado = { id: doc.id, ...data };
      }
    });

    return chatEncontrado;
  } catch (error) {
    console.error("Error al buscar chat específico:", error);
    return null;
  }
};

// 5. Función para reiniciar el contador a 0 cuando el usuario entra al chat
export const marcarComoLeido = async (chatId: string, userId: string) => {
  try {
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      [`noLeidos.${userId}`]: 0
    });
  } catch (error) {
    console.error("Error al marcar como leído:", error);
  }
};

/*===============================================
 FUNCIONALIDADES PARA EL DASHBOARD DEL POSTULANTE
===============================================*/

// 1. Obtener las 3 vacantes activas más recientes
export const obtenerEmpleosRecomendados = async () => {
  try {
    const vacantesRef = collection(db, "vacantes");
    // Buscamos solo activas y las ordenamos por fecha
    const q = query(
      vacantesRef, 
      where("estado", "==", "activa")
    );
    
    const querySnapshot = await getDocs(q);
    const vacantes: any[] = [];
    
    querySnapshot.forEach((doc) => {
      vacantes.push({ id: doc.id, ...doc.data() });
    });
    
    // Las ordenamos manualmente (por si hay problemas con índices en Firebase) y tomamos las 3 primeras
    return vacantes
      .sort((a, b) => (b.fechaCreacion?.toMillis() || 0) - (a.fechaCreacion?.toMillis() || 0))
      .slice(0, 3);
  } catch (error) {
    console.error("Error al obtener empleos recomendados:", error);
    return [];
  }
};

// 2. Obtener top 3 empresas con más vacantes activas
export const obtenerEmpresasDestacadas = async () => {
  try {
    const vacantesRef = collection(db, "vacantes");
    const q = query(vacantesRef, where("estado", "==", "activa"));
    const querySnapshot = await getDocs(q);
    
    // Usamos un mapa para contar cuántas vacantes tiene cada empresa
    const empresasMap = new Map();
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const empresaNombre = data.nombreEmpresa || 'Empresa Confidencial';
      
      if (empresasMap.has(empresaNombre)) {
        empresasMap.set(empresaNombre, empresasMap.get(empresaNombre) + 1);
      } else {
        empresasMap.set(empresaNombre, 1);
      }
    });

    // Convertimos el mapa a un arreglo, lo ordenamos por cantidad y tomamos las 3 mejores
    const empresasArray = Array.from(empresasMap, ([nombre, vacantes]) => ({
      nombre,
      vacantes,
      sector: 'Diversos Sectores', // Placeholder, ya que el sector no suele estar en la vacante directamente
      logo: nombre.charAt(0).toUpperCase()
    }));

    return empresasArray
      .sort((a, b) => b.vacantes - a.vacantes)
      .slice(0, 3);
  } catch (error) {
    console.error("Error al obtener empresas destacadas:", error);
    return [];
  }
};

// 3. Obtener Tasa de Respuesta (Cálculo aproximado de chats activos)
export const calcularTasaRespuestaPostulante = async (postulanteId: string) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participantes", "array-contains", postulanteId));
    const querySnapshot = await getDocs(q);
    
    let totalChatsActivados = 0;
    let chatsRespondidosPorMi = 0;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Si el chat pasó de "pendiente" a "activo", significa que el empleador inició la conversación
      if (data.estado === 'activo') {
        totalChatsActivados++;
        // Si mis no leídos son 0 y el chat está activo, asumimos que he leído/respondido
        if (data.noLeidos && data.noLeidos[postulanteId] === 0) {
          chatsRespondidosPorMi++;
        }
      }
    });

    if (totalChatsActivados === 0) return 0; // Si nadie te ha hablado, 0%
    return Math.round((chatsRespondidosPorMi / totalChatsActivados) * 100);
  } catch (error) {
    console.error("Error al calcular tasa de respuesta:", error);
    return 0;
  }
};

/*==================================================
 FUNCIONALIDADES PARA EL DASHBOARD DEL EMPLEADOR
==================================================*/

// 1. Calcular Tasa de Respuesta del Empleador
export const calcularTasaRespuestaEmpleador = async (empleadorId: string) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participantes", "array-contains", empleadorId));
    const querySnapshot = await getDocs(q);
    
    let totalChatsActivos = 0;
    let chatsRespondidosPorMi = 0;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.estado === 'activo') {
        totalChatsActivos++;
        // Si no tengo mensajes sin leer, significa que estoy al día
        if (data.noLeidos && data.noLeidos[empleadorId] === 0) {
          chatsRespondidosPorMi++;
        }
      }
    });

    if (totalChatsActivos === 0) return 100; // Si no hay chats, estás al 100% por defecto
    return Math.round((chatsRespondidosPorMi / totalChatsActivos) * 100);
  } catch (error) {
    console.error("Error al calcular tasa de respuesta:", error);
    return 100;
  }
};

// 2. Obtener Top 3 Candidatos Destacados
export const obtenerCandidatosDestacados = async (empleadorId: string) => {
  try {
    // Primero, obtenemos todos los que han postulado a las vacantes de este empleador
    const postulacionesRef = collection(db, "postulaciones");
    const q = query(postulacionesRef, where("empleadorId", "==", empleadorId));
    const querySnapshot = await getDocs(q);
    
    const candidatosUnicos = new Set<string>();
    const candidatosBasicos: any[] = [];

    // Guardamos los IDs únicos y datos básicos
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.postulanteId && !candidatosUnicos.has(data.postulanteId)) {
        candidatosUnicos.add(data.postulanteId);
        candidatosBasicos.push({
          postulanteId: data.postulanteId,
          nombre: data.nombreCandidato || 'Candidato',
          puesto: data.cargoPostulado || 'Postulante',
          compatibilidad: Math.floor(Math.random() * (95 - 75 + 1) + 75) // Simulación rápida de matching por ahora
        });
      }
    });

    // Ahora buscamos la calificación de cada candidato
    const candidatosConEstadisticas = await Promise.all(
      candidatosBasicos.map(async (candidato) => {
        const califRef = collection(db, "calificaciones");
        const qCalif = query(
          califRef, 
          where("postulanteId", "==", candidato.postulanteId),
          where("tipo", "==", "empresa_a_postulante")
        );
        const califSnapshot = await getDocs(qCalif);
        
        let suma = 0;
        let total = califSnapshot.size;
        
        califSnapshot.forEach(doc => {
          suma += Number(doc.data().puntaje) || 0;
        });

        const calificacion = total > 0 ? (suma / total) : 0;

        // Buscamos experiencia en su perfil
        let experiencia = '0 años';
        try {
          const userDoc = await getDoc(doc(db, "usuarios", candidato.postulanteId));
          if (userDoc.exists()) {
             const userData = userDoc.data();
             if (userData.experiencias && userData.experiencias.length > 0) {
                experiencia = `${userData.experiencias.length} empleos`;
             }
          }
        } catch(e) {}

        return {
          ...candidato,
          calificacion: Number(calificacion.toFixed(1)),
          totalOpiniones: total,
          experiencia
        };
      })
    );

    // Ordenamos: Primero por calificación, luego por cantidad de opiniones para desempatar
    return candidatosConEstadisticas
      .sort((a, b) => {
        if (b.calificacion !== a.calificacion) return b.calificacion - a.calificacion;
        return b.totalOpiniones - a.totalOpiniones;
      })
      .slice(0, 3);

  } catch (error) {
    console.error("Error al obtener candidatos destacados:", error);
    return [];
  }
};