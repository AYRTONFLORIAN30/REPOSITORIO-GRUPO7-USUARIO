// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user } = useUser();
  const [today] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [horaSincronizacion, setHoraSincronizacion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('eventos_sincronizados');
    const hora = localStorage.getItem('ultima_sincronizacion');
    if (data) setEventos(JSON.parse(data));
    if (hora) setHoraSincronizacion(hora);
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img src={user?.picture || '/user.png'} alt="Avatar" className="avatar" />
          <h3>{user?.name || 'Usuario'}</h3>
          <p>{user?.email || 'correo@correo.com'}</p>
        </div>
        <nav className="menu">
          <button onClick={() => navigate('/dashboard')}>🏠 Inicio</button>
          <button onClick={() => navigate('/horarios')}>📅 Horarios</button>
          <button onClick={() => navigate('/configuracion')}>⚙️ Configuración</button>
        </nav>
      </aside>

      <main className="main-panel">
        <h2>Pantalla principal</h2>
        <p className="welcome-msg">
          Bienvenido de vuelta, <span className="highlight">{user?.name}</span>.
        </p>

        <div className="grid">
          <div className="card eventos">
            <h3>📌 Eventos Próximos</h3>
            <ul>
              {eventos.length > 0 ? (
                eventos.slice(0, 3).map((ev, i) => (
                  <li key={i}>
                    <strong>{ev.Clase}</strong>
                    <div>{ev.Día} | {ev.Hora} | Presencial | {ev.Aula}</div>
                  </li>
                ))
              ) : (
                <li>No hay eventos sincronizados</li>
              )}
            </ul>
            <button className="btn-ver" onClick={() => navigate('/horarios')}>
              Ver más
            </button>
          </div>

          <div className="card sync">
            <h3>🔄 Sincronización</h3>
            <p>Última sincronización:</p>
            <p className="hora">
              {horaSincronizacion ? `Hoy a las ${horaSincronizacion}` : 'Aún no realizada'}
            </p>
            <div className="status success">✔️ Sincronización exitosa</div>
          </div>

          <div className="card calendar">
            <h3>📅 {today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h3>
            <div className="calendar-grid">
              {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((d) => (
                <div key={d} className="day-name">{d}</div>
              ))}
              {[...Array(31)].map((_, i) => (
                <div
                  key={i + 1}
                  className={`day ${i + 1 === today.getDate() ? 'today' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="acciones">
          <button className="btn-ver-horarios" onClick={() => navigate('/horarios')}>
            Ver horarios
          </button>
          <button className="btn-config" onClick={() => navigate('/configuracion')}>
            Configuración
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
