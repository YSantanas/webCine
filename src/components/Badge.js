import React from "react";
import { MdStarOutline, MdStar } from "react-icons/md";

//importamos la carpeta de los logos
import cLogo2 from "../imagenes/logo2.png";

//Importamos estilos
import "./styles/Badge.css";

const Stars = ({ calificacion = 0 }) => {
  const estrellasLLenas = parseInt(calificacion);
  const estrellasVacias = parseInt(5 - calificacion);

  return (
    <div className="Badge__stars">
      {[...Array(estrellasLLenas)].map((_, indice) => (
        <MdStar key={indice} /> //Las estrellas que se muestran
      ))}
      {[...Array(estrellasVacias)].map((_, indice) => (
        <MdStarOutline key={indice} /> //Las estrellas que se muestran
      ))}
    </div>
  );
};

const Badge = ({
  id = "",
  titulo = "",
  calificacion = 0,
  portada = null,
  descripcion = "",
  setPeliculas,
  peliculas,
  setTempPelicula,
}) => {
  const handleDelete = () => {
    setPeliculas((peliculasAnteriores) => {
      const peliculasFiltradas = peliculasAnteriores.filter(
        (pelicula) => pelicula.id !== id
      );
      return peliculasFiltradas;
    });
  };

  const handleEdit = () => {
    const peliculaModificable = peliculas.find(
      (pelicula) => pelicula.id === id
    );
    setTempPelicula(peliculaModificable);
  };

  return (
    <div className="Badge">
      <div className="Badge__header">
        <img src={cLogo2} alt="Logo principal" />
      </div>
      {portada && (
        <div className="Badge__section-name">
          <img src={portada} className="Badge__avatar img-fluid" alt="AVATAR" />
        </div>
      )}
      {calificacion > 0 && <Stars calificacion={calificacion} />}
      <div className="Badge__section-info">
        <h1>{titulo}</h1>
        <p>{descripcion}</p>
      </div>

      <div className="d-flex justify-content-center gap-1 pb-3">
        <button className="btn btn-warning" onClick={handleEdit}>
          Modificar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Badge;
