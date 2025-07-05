// src/pages/SincronizacionGoogle.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/SincronizacionGoogle.css';
import { exportarHorariosAPDF } from '../utils/pdfGenerator';

function SincronizacionGoogle() {
  const navigate = useNavigate();
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleVolver = () => {
    navigate('/dashboard');
  };

  const handleExportar = () => {
    const eventos = localStorage.getItem('eventos_sincronizados');
    if (!eventos) {
      alert('No hay horarios disponibles para exportar.');
      return;
    }

    try {
      const data = JSON.parse(eventos);
      if (Array.isArray(data) && data.length > 0) {
        exportarHorariosAPDF(data);
      } else {
        alert('No hay horarios disponibles para exportar.');
      }
    } catch (error) {
      console.error('Error al parsear eventos:', error);
      alert('Error al procesar los horarios sincronizados.');
    }
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
            <p>Se completó la sincronización<br />de manera exitosa</p>
          </div>
          <div className="card error">
            <p>No hubo ningún error en<br />la sincronización</p>
          </div>
        </div>

        <div className="btn-group">
          <button className="exportar-btn" onClick={handleExportar}>
            Exportar horarios a PDF
          </button>
          <button className="back-button" onClick={handleVolver}>
            Volver al inicio
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default SincronizacionGoogle;
