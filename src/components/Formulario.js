import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ setPeliculas, tempPelicula, setTempPelicula }) => {
  const [titulo, setTitulo] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [portada, setPortada] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const resetForm = () => {
    setTitulo("");
    setCalificacion(0);
    setPortada("");
    setDescripcion("");
  };

  useEffect(() => {
    if (!!tempPelicula) {
      setTitulo(tempPelicula?.titulo || "");
      setCalificacion(tempPelicula?.calificacion || 0);
      setPortada(tempPelicula?.portada || "");
      setDescripcion(tempPelicula?.descripcion || "");
    }
  }, [tempPelicula]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaPelicula = {
      id: uuid(),
      titulo,
      calificacion,
      portada,
      descripcion,
    };
    setPeliculas((peliculasAnteriores) => [
      ...peliculasAnteriores,
      nuevaPelicula,
    ]);
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const peliculaActualizada = {
      id: tempPelicula?.id,
      titulo,
      calificacion,
      portada,
      descripcion,
    };
    setPeliculas((peliculasAnteriores) => {
      const peliculasActualizadas = peliculasAnteriores.map((pelicula) => {
        if (pelicula.id === peliculaActualizada.id) {
          return peliculaActualizada;
        }
        return pelicula;
      });
      return peliculasActualizadas;
    });
    setTempPelicula(null);
    resetForm();
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleCalificacionChange = (e) => {
    setCalificacion(e.target.value);
  };

  const handlePortadaChange = (e) => {
    setPortada(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center">Añadir Peliculas</h1>

      <form
        onSubmit={(e) => {
          if (!!tempPelicula) handleUpdate(e);
          else handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="">Titulo</label>
          <input
            onChange={handleTituloChange}
            className="form-control"
            type="text"
            name="Titulo"
            value={titulo}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Calificacion</label>
          <input
            onChange={handleCalificacionChange}
            className="form-control"
            type="number"
            name="Calificacion"
            min="0"
            max="5"
            value={calificacion}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Portada</label>
          <input
            onChange={handlePortadaChange}
            className="form-control"
            type="text"
            name="Portada"
            value={portada}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Descripcion</label>
          <input
            onChange={handleDescripcionChange}
            className="form-control"
            type="text"
            name="Descripcion"
            value={descripcion}
          ></input>
        </div>

        <button
          className={`btn btn-${
            !!tempPelicula ? "warning" : "primary"
          } w-100 mt-3`}
          type="submit"
        >
          {!!tempPelicula ? "Actualizar" : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
