import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useDataMovies = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaEdit, setPeliculaEdit] = useState(null);

  const API_URL = "https://retoolapi.dev/vmJ8AL/peliculas";

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      setPeliculas(res.data);
    } catch (err) {
      console.error("Error al obtener películas:", err);
    }
  };

  const eliminarPelicula = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción eliminará la película!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire("¡Eliminada!", "La película ha sido eliminada.", "success");
        fetchMovies();
      } catch (err) {
        console.error("Error al eliminar película:", err);
        Swal.fire("Error", "No se pudo eliminar la película.", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowRegister(false);
    setPeliculaEdit(null);
  };

  const handleSuccess = () => {
    fetchMovies();
    handleCloseModal();
  };

  // NUEVAS FUNCIONES PARA ABRIR EL MODAL CORRECTAMENTE
  const openModalForNew = () => {
    setPeliculaEdit(null);
    setShowRegister(true);
  };

  const openModalForEdit = (pelicula) => {
    setPeliculaEdit(pelicula);
    setShowRegister(true);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    peliculas,
    eliminarPelicula,
    showRegister,
    peliculaEdit,
    handleCloseModal,
    handleSuccess,
    openModalForNew,
    openModalForEdit,
  };
};

export default useDataMovies;
