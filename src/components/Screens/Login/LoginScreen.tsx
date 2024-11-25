import React from 'react';
import { useLogin } from '../../../hooks/useLogin';
import '../../../App.css';
import { FaSign, FaSignInAlt } from 'react-icons/fa';

const ActivityIndicator: React.FC<{ style?: React.CSSProperties, size?: number, color?: string }> = ({ style, size = 50, color = 'black' }) => (
    <div style={{ ...style, width: size, height: size, backgroundColor: color, borderRadius: '50%', opacity: 0.6 }} />
);

export const LoginScreen: React.FC = () => {
    const { 
        loading, 
        state, 
        handleInputChange, 
        handleLogin,
        request 
    } = useLogin();

    return (
        <section className='section'>
              <div className='item'>
        <img className='img' src={require('../../../assets/logo-09.png')} />
        <p>24 horas</p>
        <br />
      </div>
<br />

      <p className='title' >Iniciar Sesión</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        { typeof request === 'boolean' && !request && (
    <p className='texts'>
        {'Contraseña incorrecta '}
        <br />
        {'Envío de datos faltantes'}
    </p>
)}

<br />
<br />
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
                    onClick={handleLogin} >
                      
                        Iniciar Sesión
                     
                </a>
                <FaSignInAlt className='icon' />
            </div>
        </section>
    );
};
