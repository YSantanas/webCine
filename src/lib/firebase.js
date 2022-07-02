import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_7JGIjHWt9FchHwldzwIDOtk5y3S3iw4',
  authDomain: 'webpeliculas-cef56.firebaseapp.com',
  projectId: 'webpeliculas-cef56',
  storageBucket: 'webpeliculas-cef56.appspot.com',
  messagingSenderId: '506729322422',
  appId: '1:506729322422:web:5b4b508e42ce950122d317',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export { app };

export const obtenerPeliculasDesdeFirebase = async () => {
  const queryPeliculas = await getDocs(collection(db, 'peliculas'));
  let peliculas = [];
  queryPeliculas.forEach((pelicula) => {
    peliculas.push({
      id: pelicula.id,
      ...pelicula.data(),
    });
  });
  return peliculas;
};

export const agregarPeliculaEnFirebase = async (pelicula) => {
  try {
    const docRef = await addDoc(collection(db, 'peliculas'), {
      titulo: pelicula.titulo || '',
      calificacion: pelicula.calificacion || 0,
      portada: pelicula.portada || '',
      descripcion: pelicula.descripcion || '',
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const eliminarPeliculaEnFirebase = async (id) => {
  try {
    await deleteDoc(doc(db, 'peliculas', id));
    console.log('Document deleted');
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const actualizarPeliculaEnFirebase = async (pelicula) => {
  try {
    await setDoc(doc(db, 'peliculas', pelicula.id), {
      titulo: pelicula.titulo || '',
      calificacion: pelicula.calificacion || 0,
      portada: pelicula.portada || '',
      descripcion: pelicula.descripcion || '',
    });
    console.log('Document updated');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
