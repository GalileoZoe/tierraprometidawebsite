import React, { useContext } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import '../../../App.css';
import { AuthContext } from '../../../context/AuthContext';
import { useFeed } from '../../../context/FeedContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {

      const navigate = useNavigate(); 
    const {
        loading,
        state,
        handleInputChange,
        handleLogin,
        request
    } = useLogin();

    const { authState } = useContext(AuthContext);


      // 🔹 Funciones de navegación
  const goToLRegister = () => navigate('/register');



    return (
        <section className='section'>
            <br />
            <br />
            <br />
            <div className='item'>
                <img className='img' src={require('../../../assets/logo-09.png')} alt="logo"/>
                <p>24 horas</p>
            </div>
            <br />

            <p className='title'>Iniciar Sesión</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {typeof request === 'boolean' && !request && (
                    <p className='texts'>
                        {'Contraseña incorrecta '}
                        <br />
                        {'Envío de datos faltantes'}
                    </p>
                )}

                <input
                    className='inputredlogin'
                    value={state.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder='Correo Electrónico'
                    type='email'
                    disabled={loading}
                    required
                />
                <br />
                <input
                    className='inputredlogin'
                    value={state.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder='Contraseña'
                    type='password'
                    disabled={loading}
                    required
                />
                <br />
                <br />
                <a
                    className='button'
                    onClick={handleLogin}
                >
                    Iniciar Sesión
                </a>

                <br />

                <a
                    className='button'
                    style={{ backgroundColor: '#555', marginTop: '10px' }}
                    onClick={goToLRegister}
                >
                    Registrarse
                </a>
            </div>
        </section>
    );
};
