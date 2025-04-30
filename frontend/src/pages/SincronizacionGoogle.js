// src/pages/SincronizacionGoogle.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importar hook
import Layout from '../components/Layout';
import '../styles/SincronizacionGoogle.css';

function SincronizacionGoogle() {
  const navigate = useNavigate(); // ✅ Inicializar hook
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleVolver = () => {
    navigate('/dashboard'); // ✅ Redirigir al dashboard
  };

  return (
    <Layout>
      <div className="sync-container">
        <h2>Sincronización de Google Calendar</h2>
        
        <div className="sync-status">
          <div className="estado-box">
            <p>Última sincronización:</p>
            <h3>{fecha} a las {hora} ✅</h3>
          </div>
        </div>

        <div className="sync-analysis">
          <div className="card success">
            <img src="/success-icon.png" alt="check" />
            <p>Se completó la sincronización<br />de manera exitosa</p>
          </div>
          <div className="card error">
            <img src="/bug-icon.png" alt="bug" />
            <p>No hubo ningún error en<br />la sincronización</p>
          </div>
        </div>

        <button className="back-button" onClick={handleVolver}>
          Volver al inicio
        </button>
      </div>
    </Layout>
  );
}

export default SincronizacionGoogle;
