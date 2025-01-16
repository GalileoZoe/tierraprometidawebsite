import React from 'react';
import { useLogin } from '../../../hooks/useLogin';
import '../../../App.css';
import { FaSignInAlt } from 'react-icons/fa';


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
               <br />
               <br />
               <br />
            <div className='item'>
                <img className='img' src={require('../../../assets/logo-09.png')} />
                <p>24 horas</p>
          
            </div>
            <br />

            <p className='title' >Iniciar Sesión</p>
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
                    onClick={handleLogin} >

                    Iniciar Sesión

                </a>
            </div>
        </section>
    );
};
