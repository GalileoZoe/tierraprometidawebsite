import React, { useState, useEffect } from "react";
import "../../App.css";
import { useTheme } from "../../context/ThemeContext";
import { useSession } from "../../context/SessionContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaCog,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";

export const NavBar: React.FC = () => {
  const { theme } = useTheme();
  const { session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const redColor = "#db1313";

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || navigator.userAgent.toLowerCase().includes("mobi")
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    ...(session === 0 ? [{ path: "/login", label: "Iniciar Sesión", icon: <FaUserAlt /> }] : []),
    { path: "/feed", label: "Inicio", icon: <FaHome /> },
    { path: "/about", label: "Nosotros", icon: <FaInfoCircle /> },
    { path: "/services", label: "Servicios", icon: <FaCog /> },
    ...(session === 1 ? [{ path: "/students", label: "Usuarios", icon: <FaUsers /> }] : []),
    { path: "/events", label: "Eventos", icon: <FaCalendarAlt /> },
    { path: "/location", label: "Ubicación", icon: <FaMapMarkerAlt /> },
    { path: "/contact", label: "Contacto", icon: <FaEnvelope /> },
    { path: "/help", label: "Ayuda", icon: <FaQuestionCircle /> },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbarlogo" onClick={() => navigate("/feed")} style={{ cursor: "pointer" }}>
          <img src={require("../../assets/logo-20.png")} alt="Logo" />
        </div>

        {isMobile && (
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            ☰
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul className={`navbaritems ${theme === 1 ? "" : "navbaritemswhite"}`}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  className={
                    location.pathname === item.path
                      ? "navbaritemselected"
                      : "navbaritem"
                  }
                  onClick={() => navigate(item.path)}
                  style={
                    location.pathname === item.path
                      ? { color: redColor, fontWeight: 800 }
                      : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Mobile Drawer */}
      {isMobile && (
        <>
          {isMenuOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 998,
              }}
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div
            style={{
              position: "fixed",
              top: 0,
              left: isMenuOpen ? 0 : "-300px",
              width: "280px",
              height: "100vh",
              background: "transparent",
              backdropFilter: "blur(10px)",
              zIndex: 999,
              transition: "left 0.3s ease",
              padding: "20px 0",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <div className="marginvertical"></div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px 30px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={require("../../assets/logo-00.png")}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            {/* Menu Items */}
            <div style={{ padding: "20px 0" }}>
              {menuItems.map((item) => (
                <div
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px 20px",
                    color:
                      location.pathname === item.path ? redColor : "white",
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    cursor: "pointer",
                    borderLeft:
                      location.pathname === item.path
                        ? `4px solid ${redColor}`
                        : "4px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Créditos */}
            <div
              style={{
                marginTop: "auto",
                paddingBottom: "3em",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
              }}
            >
              <code
                style={{
                  fontSize: "1em",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              >
                By:
              </code>
              <img
                src={require("../../assets/galileozoe-00.png")}
                alt="Logo GZ (Developer)"
                style={{ width: "8em", height: "auto" }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
