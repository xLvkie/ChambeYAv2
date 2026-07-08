import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// 1. FUNCION DE REGISTRO
export const registrarUsuario = async (email: string, password: string, nombre: string, rol: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      uid: user.uid,
      nombre: nombre,
      email: email,
      rol: rol, 
      perfilCompleto: false, 
      fechaRegistro: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};

// 2. FUNCION DE LOGIN
export const iniciarSesion = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    
    if (userDoc.exists()) {
      return { authUser: user, userData: userDoc.data() };
    } else {
      throw new Error("No se encontraron datos del usuario en la base de datos.");
    }
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// 3. FUNCION DE LOGOUT
export const cerrarSesion = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};