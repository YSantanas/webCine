import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import {
  actualizarPeliculaEnFirebase,
  agregarPeliculaEnFirebase,
} from '../lib/firebase';

const Formulario = ({ setPeliculas, tempPelicula, setTempPelicula }) => {
  const [values, handleChange, resetForm] = useForm(
    {
      titulo: '',
      calificacion: 0,
      portada: '',
      descripcion: '',
    },
    setTempPelicula
  );

  useEffect(() => {
    // Si existe TempPelicula, se carga el formulario con los datos de la pelicula
    if (!!tempPelicula) {
      resetForm(tempPelicula);
    }
  }, [resetForm, tempPelicula]);

  console.log('tempPelicula', tempPelicula);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaPelicula = {
      titulo: values.titulo,
      calificacion: values.calificacion,
      portada: values.portada,
      descripcion: values.descripcion,
    };
    const peliculaCreadaId = await agregarPeliculaEnFirebase(nuevaPelicula);
    setPeliculas((peliculasAnteriores) => [
      ...peliculasAnteriores,
      {
        id: peliculaCreadaId,
        ...nuevaPelicula,
      },
    ]);

    resetForm();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const peliculaActualizada = {
      id: tempPelicula?.id,
      titulo: values.titulo,
      calificacion: values.calificacion,
      portada: values.portada,
      descripcion: values.descripcion,
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
    await actualizarPeliculaEnFirebase(peliculaActualizada);
    setTempPelicula(null);
    resetForm();
  };

  return (
    <div className="sticky-top pt-3">
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
            onChange={handleChange}
            className="form-control"
            type="text"
            name="titulo"
            value={values.titulo}
            placeholder="Nombre de la pelicula"
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Calificacion</label>
          <input
            onChange={handleChange}
            className="form-control"
            type="number"
            name="calificacion"
            min="0"
            max="5"
            value={values.calificacion}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Portada</label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="portada"
            value={values.portada}
            placeholder="Url de la portada"
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="">Descripcion</label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="descripcion"
            value={values.descripcion}
            placeholder="Reseña de la pelicula"
          ></input>
        </div>

        <button
          className={`btn btn-${
            !!tempPelicula ? 'warning' : 'primary'
          } w-100 mt-3`}
          type="submit"
          disabled={
            !values.titulo ||
            !values.calificacion ||
            !values.portada ||
            !values.descripcion
          }
        >
          {!!tempPelicula ? 'Actualizar' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
