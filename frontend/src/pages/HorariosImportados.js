// src/pages/HorariosImportados.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import './ImportarHorario.css';

function HorariosImportados() {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('horarios');
    if (data) {
      setHorarios(JSON.parse(data));
    }
  }, []);

  return (
    <Layout>
      <div className="import-container">
        <h2>Horarios importados</h2>

        {horarios.length > 0 ? (
          <>
            <div className="filtros-barra">
              {/* Aquí podrías agregar los filtros visuales de Figma */}
              <button className="btn-azul">Sincronizar con calendar</button>
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
                {horarios.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Clase}</td>
                    <td>{item.Profesor}</td>
                    <td>{item.Día}</td>
                    <td>{item.Hora}</td>
                    <td>{item.Aula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No se encontraron horarios cargados.</p>
        )}
      </div>
    </Layout>
  );
}

export default HorariosImportados;
