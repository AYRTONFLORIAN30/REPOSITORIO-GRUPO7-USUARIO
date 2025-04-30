import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useGoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userData = await userInfoResponse.json();

        const usuario = {
          google_id: userData.sub,
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
        };

        localStorage.setItem('google_token', tokenResponse.access_token);
        localStorage.setItem('user', JSON.stringify(usuario));
        setUser(usuario);

        await fetch('http://localhost:5000/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            google_id: userData.sub,
            name: userData.name,
            email: userData.email,
          }),
        });

        navigate('/welcome');
      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:', error);
        alert('Error al obtener datos del usuario');
      }
    },
    onError: () => alert('❌ Fallo al iniciar sesión con Google'),
    flow: 'implicit',
  });

  return (
    <div className="login">
      <div className="login-box">
        <div className="avatar-placeholder"></div>

        <form className="form">
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="USUARIO" disabled />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="************" disabled />
          </div>
          <button className="login-btn" disabled>INICIAR SESIÓN</button>
        </form>

        <div className="google-section">
          <button onClick={login} className="login-btn-google">
            Iniciar sesión con Google
          </button>
        </div>

        <div className="options">
          <label>
            <input type="checkbox" disabled /> Recordar contraseña
          </label>
          <button
            className="link-button"
            onClick={() => alert('Función no implementada')}
          >
            ¿Olvidó su contraseña? <span>Click aquí</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
