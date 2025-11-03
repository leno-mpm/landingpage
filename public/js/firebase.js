import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiGrgExvziYpHa5ucacVVXIvWwqQQRn70",
  authDomain: "landingpage-32ae9.firebaseapp.com",
  projectId: "landingpage-32ae9",
  storageBucket: "landingpage-32ae9.firebasestorage.app",
  messagingSenderId: "121489813559",
  appId: "1:121489813559:web:59b552d5d486e1f0400fb2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/* ================================
   🔹 POST: Guardar reseña
================================ */
export const saveReview = async (name, role, comment) => {
  try {
    const reviewsRef = ref(database, "reviews");
    const newReviewRef = push(reviewsRef);
    await set(newReviewRef, {
      name,
      role,
      comment,
      date: new Date().toISOString()
    });
    return { status: "success", message: "Reseña guardada con éxito" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error al guardar la reseña" };
  }
};

/* ================================
   🔹 GET: Obtener todas las reseñas
================================ */
export const getReviews = async () => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "reviews"));
    if (snapshot.exists()) {
      return { status: "success", data: snapshot.val() };
    } else {
      return { status: "empty", message: "No hay reseñas disponibles" };
    }
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error al obtener reseñas" };
  }
};
