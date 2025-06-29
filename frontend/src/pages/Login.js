import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useGoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';

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
          body: JSON.stringify(usuario),
        });

        navigate('/welcome');
      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:', error);
        alert('Error al obtener datos del usuario');
      }
    },
    onError: () => alert('❌ Fallo al iniciar sesión con Google'),
    flow: 'implicit',
    redirectUri: 'https://repositorio-grupo7-usuario-1.onrender.com/callback', // Asegúrate de que esta URI coincida con la que configuraste en la Google Cloud Console
  });

  return (
    <div className="login">
      <div className="login-box">
        <div className="logo">T</div>

        <form className="form">
          <input type="text" placeholder="Código Estudiantil" disabled />
          <input type="password" placeholder="Contraseña" disabled />
          <button type="submit" className="login-btn" disabled>
            Iniciar sesión
          </button>
        </form>

        <div className="divider">o continua con</div>

        <div className="google-login">
          <button onClick={login} className="google-btn">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
