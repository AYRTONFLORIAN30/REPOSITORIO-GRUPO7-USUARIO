// src/components/Layout.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaFilePdf } from 'react-icons/fa'; // Ícono para PDF
import '../styles/Dashboard.css'; // ✅ CORRECTO

function Layout({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img
            src={user?.picture || '/user.png'}
            alt="Avatar"
            className="avatar"
          />
          <h3>{user?.name || 'Usuario'}</h3>
          <p>{user?.email || 'correo@correo.com'}</p>
        </div>
        <nav className="menu">
          <button className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
            🏠 Inicio
          </button>
          <button className={location.pathname === '/horarios' ? 'active' : ''} onClick={() => navigate('/horarios')}>
            📅 Horarios
          </button>
          <button className={location.pathname === '/configuracion' ? 'active' : ''} onClick={() => navigate('/configuracion')}>
            ⚙️ Configuración
          </button>

          {/* Botón para generar el reporte, visible siempre */}
          <button 
            className={location.pathname === '/reportes' ? 'active' : ''}
            onClick={() => navigate('/reportes')}
          >
            <FaFilePdf /> Generar Reporte de Horarios
          </button>
        </nav>
      </aside>

      <main className="main-panel">
        {children}
      </main>
    </div>
  );
}

export default Layout;
