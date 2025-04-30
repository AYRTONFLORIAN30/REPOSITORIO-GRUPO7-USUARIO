// src/pages/Welcome.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Importa el contexto de usuario
import '../styles/Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  const { user } = useUser(); // Obtén el usuario desde el contexto

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <span className="check-animation">✔</span>
        <h2 className="text-animation">Bienvenido, {user?.name || 'Usuario'}</h2>
      </div>
    </div>
  );
}

export default Welcome;
