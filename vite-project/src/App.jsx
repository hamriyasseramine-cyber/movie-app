import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Classement from "./pages/Classement";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Support from "./pages/Support";
import About from "./pages/About";

function App() {
  const location = useLocation();

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/Classement" element={<Classement />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
    </MovieProvider>
  );
}

export default App;
