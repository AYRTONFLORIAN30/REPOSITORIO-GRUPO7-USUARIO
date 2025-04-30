import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Callback() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
      fetch(`http://localhost:5000/auth/callback?code=${code}`)
        .then((res) => res.json())
        .then(async (data) => {
          localStorage.setItem('google_token', data.access_token);

          // 🔄 Obtener info del usuario
          const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });

          if (!userInfo.ok) throw new Error('Error obteniendo datos del usuario');

          const user = await userInfo.json();
          setUser({
            name: user.name,
            email: user.email,
            picture: user.picture,
          });

          alert('✅ Autenticado con Google. Token y usuario guardados.');
          navigate('/dashboard');
        })
        .catch((err) => {
          console.error('❌ Error en callback:', err);
          alert('❌ Error al autenticar con Google');
          navigate('/');
        });
    }
  }, [navigate, setUser]);

  return <p>Procesando autenticación...</p>;
}

export default Callback;
