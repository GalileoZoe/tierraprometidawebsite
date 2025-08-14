import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useFeed } from '../../context/FeedContext';
import { useTheme } from '../../context/ThemeContext';
import { useSession } from '../../context/SessionContext';
import {
  FaHome,
  FaInfoCircle,
  FaCog,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaQuestionCircle
} from 'react-icons/fa';

export const NavBar: React.FC = () => {
  const { feed, changeFeed } = useFeed();
  const { theme } = useTheme();
  const { session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const redColor = '#db1313';

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || navigator.userAgent.toLowerCase().includes('mobi'));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 1, label: 'Inicio', icon: <FaHome /> },
    { id: 2, label: 'Nosotros', icon: <FaInfoCircle /> },
    { id: 3, label: 'Servicios', icon: <FaCog /> },
    ...(session === 1 ? [{ id: 7, label: 'Usuarios', icon: <FaUsers /> }] : []),
    { id: 4, label: 'Eventos', icon: <FaCalendarAlt /> },
    { id: 5, label: 'Ubicación', icon: <FaMapMarkerAlt /> },
    { id: 6, label: 'Contacto', icon: <FaEnvelope /> },
    { id: 11, label: 'Ayuda', icon: <FaQuestionCircle /> }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbarlogo">
          <a onClick={() => changeFeed(1)}>
            <img src={require('../../assets/logo-20.png')} alt="Logo" />
          </a>
        </div>
        {isMobile && (
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            ☰
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul className={`navbaritems ${theme === 1 ? '' : 'navbaritemswhite'}`}>
            {menuItems.map(item => (
              <li key={item.id}>
                <a
                  className={feed === item.id ? 'navbaritemselected' : 'navbaritem'}
                  onClick={() => changeFeed(item.id)}
                  style={feed === item.id ? { color: redColor, fontWeight: 800 } : undefined}
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
          {/* Overlay */}
          {isMenuOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 998
              }}
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Drawer */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: isMenuOpen ? 0 : '-300px',
              width: '280px',
              height: '100vh',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              zIndex: 999,
              transition: 'left 0.3s ease',
              padding: '20px 0',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px 30px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img
                src={require('../../assets/logo-20.png')}
                alt="Logo"
                style={{ width: '60px', height: '60px' }}
              />
            </div>

            {/* Menu Items */}
            <div style={{ padding: '20px 0' }}>
              {menuItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    changeFeed(item.id);
                    setMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px 20px',
                    color: feed === item.id ? redColor : 'white',
                    backgroundColor: feed === item.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    cursor: 'pointer',
                    borderLeft: feed === item.id ? `4px solid ${redColor}` : '4px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    if (feed !== item.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (feed !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Créditos */}
            <div
              style={{
                marginTop: 'auto',
                padding: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px'
              }}
            >
            
              <code
                style={{
                  fontSize: 'em',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '4px 6px',
                  borderRadius: '4px'
                }}
              >
                By: 
              </code>
                  <img
                src={require('../../assets/galileozoe-00.png')}
                alt="Logo GZ (Developer)"
                style={{ width: '8em', height: 'auto', borderRadius: '6px' }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
