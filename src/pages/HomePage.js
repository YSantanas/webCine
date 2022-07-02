import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
//IMPORTAMOS EL NAVBAR
import Navbar from '../components/Navbar';
import Formulario from '../components/Formulario.js';
import cLogo from '../imagenes/logo.png';
//Importamos estilos
import '../components/styles/BadgeNew.css';
import { obtenerPeliculasDesdeFirebase } from '../lib/firebase';

export const HomePage = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [tempPelicula, setTempPelicula] = useState(null);

  // El primer efecto obtenga las peliculas desde firebase
  useEffect(() => {
    const obtenerPeliculas = async () => {
      const peliculasObtenidas = await obtenerPeliculasDesdeFirebase();
      setPeliculas(peliculasObtenidas);
    };
    obtenerPeliculas();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="BadgeNew__hero">
        <img className="img-fluid" src={cLogo} alt="logo" />
        <h1>Práctica 1</h1>
      </div>

      <div className="container ">
        <div className="row p-3 my-3">
          <div className="col-6 d-flex gap-4 flex-column">
            {peliculas.map((pelicula) => {
              return (
                <Card
                  key={pelicula.id}
                  id={pelicula.id}
                  titulo={pelicula.titulo}
                  calificacion={pelicula.calificacion}
                  portada={pelicula.portada}
                  descripcion={pelicula.descripcion}
                  peliculas={peliculas}
                  setPeliculas={setPeliculas}
                  setTempPelicula={setTempPelicula}
                />
              );
            })}
          </div>
          <div className="col-6">
            <Formulario
              setPeliculas={setPeliculas}
              tempPelicula={tempPelicula}
              setTempPelicula={setTempPelicula}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
