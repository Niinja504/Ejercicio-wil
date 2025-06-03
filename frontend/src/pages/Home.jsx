import useDataMovies from "../hooks/useDataMovies";
import Modal from "../components/Modal.jsx";

const Home = () => {
  const {
    peliculas,
    eliminarPelicula,
    showRegister,
    peliculaEdit,
    handleCloseModal,
    handleSuccess,
    openModalForNew,
    openModalForEdit,
  } = useDataMovies();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Películas</h2>
      <button onClick={openModalForNew}>➕ Agregar nueva película</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Pelicula</th>
            <th>Género</th>
            <th>Año de estreno</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((p) => (
            <tr key={p.id}>
              <td>{p.pelicula}</td>
              <td>{p.genero}</td>
              <td>{p.estreno}</td>
              <td>{p.calificacion}</td>
              <td>
                <button onClick={() => openModalForEdit(p)}>✏️ Editar</button>
                <button onClick={() => eliminarPelicula(p.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRegister && (
        <Modal
          peliculaEdit={peliculaEdit}
          handleSuccess={handleSuccess}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;