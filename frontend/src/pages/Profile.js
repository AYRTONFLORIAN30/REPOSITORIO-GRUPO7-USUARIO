// src/pages/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar cualquier dato de sesión si es necesario
    navigate('/');
  };

  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user?.name || 'Nombre no disponible'}</p>
      <p><strong>Email:</strong> {user?.email || 'Email no disponible'}</p>
      <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
    </div>
  );
}

export default Profile;
