import React from 'react';
import { useLogin } from '../../../hooks/useLogin';
import '../../../App.css';

export const LoginRegister: React.FC = () => {
    const {
        loading,
        state,
        handleInputChange,
        registerLogin,
        request
    } = useLogin();

    return (
        <section className='section'>
            <br />
            <br />
            <br />
            <div className='item'>
                <img className='img' src={require('../../../assets/logo-09.png')} alt="logo" />
                <p>24 horas</p>
            </div>
            <br />

            <p className='title'>Registrar Usuario</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {typeof request === 'boolean' && !request && (
                    <p className='texts'>
                        {'No se pudo registrar el usuario '}
                        <br />
                        {'Revise los datos ingresados'}
                    </p>
                )}

                <input
                    className='inputredlogin'
                    value={state.username || ''}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder='Nombre de Usuario'
                    type='text'
                    disabled={loading}
                    required
                />
                <br />

                <input
                    className='inputredlogin'
                    value={state.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder='Correo Electrónico'
                    type='email'
                    disabled={loading}
                    required
                />
                <br />

                <input
                    className='inputredlogin'
                    value={state.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder='Contraseña'
                    type='password'
                    disabled={loading}
                    required
                />
                <br />

                <input
                    className='inputredlogin'
                    value={'Usuario'}
                    onChange={(e) => handleInputChange('rol', e.target.value)}
                    placeholder='Rol (opcional)'
                    type='text'
                    disabled={loading}
                />
                <br />
                <br />

                <a
                    className='button'
                    onClick={registerLogin}
                    style={{ cursor: 'pointer' }}
                >
                    Registrar Usuario
                </a>
            </div>
        </section>
    );
};
