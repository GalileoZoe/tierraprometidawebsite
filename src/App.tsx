import React from 'react';
import './App.css';
import { NavBar } from './components/Layout/NavBar';
import { Footer } from './components/Layout/Footer';
import { FeedProvider } from './context/FeedContext';
import { Layout } from './components/Layout/Layout';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SessionProvider } from './context/SessionContext';
import { ServiceProvider } from './context/ServiceContext';
import { AuthProvider } from './context/AuthContext';

const Apps = () => {
  const { theme } = useTheme();

  const AppTheme = () => {
    switch (theme) {
      case 0:
        return 'AppBlack';
      case 1:
        return 'AppWhite';
      case 2:
        return 'AppRed';
      default:
        return 'App'; 
    }
  };

  return (
    <div className={AppTheme()}>
      <header className='App-header'>
        <NavBar />
        <main className='main-content'>
          <div className='body'>
            <Layout />
          </div>
        </main>
        <Footer />
      </header>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <SessionProvider>
    <ThemeProvider>
      <FeedProvider>
        <ServiceProvider>
        <Apps />
        </ServiceProvider>
      </FeedProvider>
    </ThemeProvider>
    </SessionProvider>
    </AuthProvider>
  );
}

export default App;
