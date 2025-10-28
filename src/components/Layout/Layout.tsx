import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "../../App.css";

import { AuthContext } from "../../context/AuthContext";
import { useSession } from "../../context/SessionContext";

// Screens
import { About } from "../Screens/About";
import { Contact } from "../Screens/Contact";
import { Feed } from "../Screens/Feed";
import { Location } from "../Screens/Location";
import { Services } from "../Screens/Services";
import { Students } from "../Screens/Students/Students";
import { Store } from "../Screens/Store/Store";
import { Help } from "../Screens/Help";
import { Login } from "../Screens/Login/Login";
import { Events } from "../Screens/Events";
import { Payments } from "../Screens/Payments/Payments";
import { LoginRegister } from "../Screens/Login/LoginRegister";
import StudentsFiles from "../Screens/Students/StudentsFiles";
import { StudentDetail } from "../Screens/Students/StudentDetail";

export const Layout: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const { changeSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isLoggenIn) {
      changeSession(1);
      navigate("/feed", { replace: true });
    } else {
      navigate("/feed", { replace: true });
    }
  }, [authState.isLoggenIn]);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<LoginRegister />} />

      {/* Rutas protegidas */}
      <Route path="/feed" element={<Feed />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/events" element={<Events />} />
      <Route path="/location" element={<Location />} />
      <Route path="/contact" element={<Contact />} />
      {authState.isLoggenIn&&<Route path="/students" element={<Students />} /> }
      {authState.isLoggenIn&&<Route path="/payments" element={<Payments />} />}
      {authState.isLoggenIn&&<Route path="/store" element={<Store />} />}
      <Route path="/help" element={<Help />} />
      <Route path="/students/:id/payments" element={<Payments />} />
      <Route path="/students/:id/files" element={<StudentsFiles />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/:id" element={<StudentDetail />} />
      <Route path="/students/:id/payments" element={<Payments />} />




      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
};
