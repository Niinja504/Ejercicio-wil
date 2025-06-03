import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import '../components/styles/Modal.css'

const Modal = ({ peliculaEdit, handleSuccess, handleCloseModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isEdit = !!peliculaEdit;

  useEffect(() => {
    if (isEdit) {
      reset({
        pelicula: peliculaEdit.pelicula || "",
        genero: peliculaEdit.genero || "",
        estreno: peliculaEdit.estreno || "",
        calificacion: peliculaEdit.calificacion || "",
      });
    } else {
      reset({
        pelicula: "",
        genero: "",
        estreno: "",
        calificacion: "",
      });
    }
  }, [peliculaEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await axios.put(`https://retoolapi.dev/vmJ8AL/peliculas/${peliculaEdit.id}`, data);
        Swal.fire("Actualizado", "La película ha sido actualizada correctamente", "success");
      } else {
        await axios.post(`https://retoolapi.dev/vmJ8AL/peliculas`, data);
        Swal.fire("Registrado", "La película ha sido añadida correctamente", "success");
      }
      handleSuccess();
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>{isEdit ? "Editar Película" : "Registrar Nueva Película"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="formulario">
          <div>
            <label>Película</label>
            <input
              type="text"
              {...register("pelicula", { required: "El título es obligatorio" })}
            />
            {errors.pelicula && <p className="error">{errors.pelicula.message}</p>}
          </div>

          <div>
            <label>Género</label>
            <input
              type="text"
              {...register("genero", { required: "El género es obligatorio" })}
            />
            {errors.genero && <p className="error">{errors.genero.message}</p>}
          </div>

          <div>
            <label>Año de estreno</label>
            <input
              type="number"
              {...register("estreno", {
                required: "El año de estreno es obligatorio",
                min: { value: 1900, message: "Año no válido" },
              })}
            />
            {errors.estreno && <p className="error">{errors.estreno.message}</p>}
          </div>

          <div>
            <label>Calificación</label>
            <input
              type="number"
              step="0.1"
              {...register("calificacion", {
                required: "La calificación es obligatoria",
                min: { value: 0, message: "Valor mínimo 0" },
                max: { value: 10, message: "Valor máximo 10" },
              })}
            />
            {errors.calificacion && <p className="error">{errors.calificacion.message}</p>}
          </div>

          <div className="botones">
            <button type="submit">{isEdit ? "Actualizar Película" : "Registrar Película"}</button>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
