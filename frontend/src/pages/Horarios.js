// src/pages/Horarios.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Horarios.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';

function Horarios() {
  const navigate = useNavigate();
  const location = useLocation();
  const horarios = location.state?.horarios || [];

  const [showModal, setShowModal] = useState(false);

  const handleSync = async () => {
    const storedToken = localStorage.getItem('google_token');

    if (!storedToken) {
      alert('Por favor inicia sesión con Google primero.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/sync-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: storedToken, eventos: horarios }),
      });

      if (response.ok) {
        const horaActual = new Date().toLocaleTimeString('es-PE', {
          hour: '2-digit', minute: '2-digit'
        });

        localStorage.setItem('eventos_sincronizados', JSON.stringify(horarios));
        localStorage.setItem('ultima_sincronizacion', horaActual); // ✅ hora exacta
        setShowModal(true);
      } else {
        alert('Error al sincronizar eventos');
      }
    } catch (error) {
      console.error('Error al sincronizar:', error);
      alert('Hubo un problema al conectar con el servidor');
    }
  };

  const handleContinuar = () => {
    setShowModal(false);
    navigate('/sync');
  };

  return (
    <Layout>
      {showModal && (
        <SuccessModal
          titulo="Sincronización exitosa!"
          mensaje="Se completó la sincronización"
          onClose={handleContinuar}
        />
      )}

      <div className="horarios-content">
        <h2>Horarios importados</h2>

        <div className="horarios-buttons">
          <button className="importar-btn" onClick={() => navigate('/importar-horario')}>
            📥 Importar horario
          </button>

          <button
            className="sincronizar-btn"
            onClick={handleSync}
            disabled={horarios.length === 0}
          >
            <img
              src="/google-icon.png"
              alt="Google Icon"
              style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
            />
            Sincronizar con Google Calendar
          </button>
        </div>

        <div className="horarios-filtros">
          <select><option>Clase</option></select>
          <select><option>Profesor</option></select>
          <select><option>Día</option></select>
          <select><option>Hora</option></select>
          <select><option>Aula</option></select>
        </div>

        <table className="horarios-tabla">
          <thead>
            <tr>
              <th>Clase</th>
              <th>Profesor</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Aula</th>
            </tr>
          </thead>
          <tbody>
            {horarios.length > 0 ? (
              horarios.map((item, index) => (
                <tr key={index}>
                  <td>{item.Clase}</td>
                  <td>{item.Profesor}</td>
                  <td>{item.Día}</td>
                  <td>{item.Hora}</td>
                  <td>{item.Aula}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sin-horarios">
                  <div className="no-horarios-icon">📅</div>
                  <p>No hay horarios exportados</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Horarios;
