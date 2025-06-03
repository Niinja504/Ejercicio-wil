import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Welcome.css'

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Bienvenido</h1>
      <p>Redirigiendo al panel principal...</p>
      <button onClick={() => navigate("/home")}>Ir ahora</button>
    </div>
  );
};

export default Welcome;
