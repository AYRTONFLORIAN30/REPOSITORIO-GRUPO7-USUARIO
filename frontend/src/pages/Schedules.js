import React from 'react';

function Schedules() {
  // Datos simulados para los horarios
  const mockData = [
    { clase: 'Matemáticas', profesor: 'Profesor Pérez', dia: 'Lunes', hora: '8:00 - 9:30 AM', aula: '101' },
    { clase: 'Ciencias', profesor: 'Profesor García', dia: 'Martes', hora: '10:00 - 11:30 AM', aula: '202' },
    { clase: 'Historia', profesor: 'Profesor Fernández', dia: 'Miércoles', hora: '1:00 - 2:30 PM', aula: '303' },
    { clase: 'Inglés', profesor: 'Profesor López', dia: 'Jueves', hora: '9:00 - 10:30 AM', aula: '104' },
    { clase: 'Física', profesor: 'Profesor Díaz', dia: 'Viernes', hora: '11:00 - 12:30 PM', aula: '105' },
  ];

  return (
    <div className="container mt-5">
      <h2>Horarios</h2>
      <p>Aquí se mostrarán los horarios importados.</p>
      <table className="table mt-3">
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
          {mockData.map((horario, index) => (
            <tr key={index}>
              <td>{horario.clase}</td>
              <td>{horario.profesor}</td>
              <td>{horario.dia}</td>
              <td>{horario.hora}</td>
              <td>{horario.aula}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedules;
