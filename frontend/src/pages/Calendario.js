// src/pages/Calendario.js
import React from 'react';
import '../styles/Calendario.css';

function Calendario() {
  const crearEvento = async () => {
    const token = localStorage.getItem('google_token');
    if (!token) {
      alert('Primero inicia sesión con Google.');
      return;
    }

    const evento = {
      summary: "Reunión de prueba",
      description: "Discusión del proyecto con el equipo",
      start: {
        dateTime: "2025-04-02T10:00:00-05:00",
        timeZone: "America/Lima",
      },
      end: {
        dateTime: "2025-04-02T11:00:00-05:00",
        timeZone: "America/Lima",
      },
    };

    try {
      const res = await fetch('http://localhost:5000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, event: evento }),
      });

      if (!res.ok) throw new Error('Error al crear evento');
      const data = await res.json();
      console.log('Evento creado:', data);
      alert('✅ Evento creado correctamente en Google Calendar');
    } catch (err) {
      console.error(err);
      alert('❌ Error al crear el evento');
    }
  };

  return (
    <div className="calendario">
      <h2>Pantalla de Calendario</h2>
      <p>Aquí podrás ver tus eventos sincronizados con Google Calendar.</p>
      <button onClick={crearEvento}>Crear Evento en Google Calendar</button>
    </div>
  );
}

export default Calendario;
