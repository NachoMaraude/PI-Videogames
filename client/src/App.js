import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<VideogameDetail />} />
      <Route path="/CreateVideogame" element={<CreateVideogame />} />
    </Routes>
  );
}

export default App;
