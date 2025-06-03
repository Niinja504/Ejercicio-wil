import { NavLink } from "react-router-dom";
import "./styles/Nav.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink className="logo" to="/">Películas</NavLink>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">Welcome</NavLink>
        <NavLink to="/home" className="nav-link">Home</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
