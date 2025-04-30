// src/components/Sidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaHome, FaCalendarAlt, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="avatar">
          {user?.picture ? (
            <img src={user.picture} alt="Perfil" />
          ) : (
            <div className="avatar-placeholder">A</div>
          )}
        </div>
        <h3>{user?.name || 'Usuario'}</h3>
        <p>{user?.email || 'correo@correo.com'}</p>
      </div>

      <nav className="menu">
        <button
          className={location.pathname === '/dashboard' ? 'active' : ''}
          onClick={() => navigate('/dashboard')}
        >
          <FaHome /> Inicio
        </button>
        <button
          className={location.pathname === '/horarios' ? 'active' : ''}
          onClick={() => navigate('/horarios')}
        >
          <FaCalendarAlt /> Horarios
        </button>
        <button
          className={location.pathname === '/configuracion' ? 'active' : ''}
          onClick={() => navigate('/configuracion')}
        >
          <FaCog /> Configuración
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
