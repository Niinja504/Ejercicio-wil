import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
