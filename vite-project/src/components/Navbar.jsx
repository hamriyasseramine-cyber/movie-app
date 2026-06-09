import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Movie App
        </NavLink>
      </div>

      {/* Desktop links */}
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Favorites
        </NavLink>
        <NavLink
          to="/Classement"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Classement
        </NavLink>
        <NavLink
          to="/Support"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Support
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Mobile: burger + theme */}
      <div className="navbar-mobile-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          {["/", "/favorites", "/Classement", "/Support", "/About"].map(
            (path, i) => {
              const labels = [
                "Home",
                "Favorites",
                "Classement",
                "Support",
                "About",
              ];
              return (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {labels[i]}
                </NavLink>
              );
            },
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
