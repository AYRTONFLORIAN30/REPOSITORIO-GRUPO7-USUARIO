import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/horarios">Horarios</Link></li>
        <li><Link to="/calendario">Calendario</Link></li>
        <li><Link to="/configuracion">Configuración</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
