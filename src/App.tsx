import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/Layout/NavBar";
import { Footer } from "./components/Layout/Footer";
import { Layout } from "./components/Layout/Layout";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { FeedProvider } from "./context/FeedContext";
import { SessionProvider } from "./context/SessionContext";
import { ServiceProvider } from "./context/ServiceContext";
import { AuthProvider } from "./context/AuthContext";
import { BackgroundProvider } from "./context/BackgroundContext";
import { IDProvider } from "./context/IDContext";

const Apps = () => {
  const { theme } = useTheme();

  const AppTheme = () => {
    switch (theme) {
      case 0:
        return "AppWhite";
      case 1:
        return "AppBlack";
      case 2:
        return "AppRed";
      default:
        return "App";
    }
  };

  return (
    <div className={AppTheme()}>
      <header className="App-header">
        <NavBar />
        <main className="main-content">
          <div className="body">
            <Layout />
          </div>
        </main>
        <Footer />
      </header>
    </div>
  );
};

export default function App() {
  return (
    <IDProvider>
      <AuthProvider>
        <SessionProvider>
          <ThemeProvider>
            <FeedProvider>
              <ServiceProvider>
                <BackgroundProvider>
                  <Router>
                    <Apps />
                  </Router>
                </BackgroundProvider>
              </ServiceProvider>
            </FeedProvider>
          </ThemeProvider>
        </SessionProvider>
      </AuthProvider>
    </IDProvider>
  );
}
