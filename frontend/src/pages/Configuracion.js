// src/pages/Configuracion.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import './Configuracion.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Configuracion() {
  const { user, setUser, logout } = useUser(); // ✅ Incluye setUser
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '' // ⚠️ No se muestra la real por seguridad
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${user.google_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password || null,
        }),
      });

      if (response.ok) {
        alert('✅ Datos actualizados correctamente');
        setEditMode({ name: false, email: false, password: false });

        // ✅ Actualizar en contexto global y localStorage
        const updatedUser = {
          ...user,
          name: form.name,
          email: form.email,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        alert('❌ Error al actualizar los datos');
      }
    } catch (err) {
      console.error('❌ Error al guardar cambios:', err);
      alert('Hubo un problema al conectarse con el servidor');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="config-container">
        <h2 className="config-title">Configuración de cuenta</h2>
        <p className="config-subtitle">Gestionar datos de tu cuenta</p>

        <div className="info-card">
          <h3>Información de la cuenta</h3>
          <div className="form-grid">
            <div>
              <label>Usuario</label>
              <div className="editable">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  readOnly={!editMode.name}
                />
                <button className="edit-btn" onClick={() => toggleEdit('name')}>✏️</button>
              </div>
            </div>
            <div>
              <label>Correo electrónico</label>
              <div className="editable">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  readOnly={!editMode.email}
                />
                <button className="edit-btn" onClick={() => toggleEdit('email')}>✏️</button>
              </div>
            </div>
            <div className="full-width">
              <label>Contraseña</label>
              <div className="editable">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  readOnly={!editMode.password}
                  placeholder="********"
                />
                <button className="edit-btn" onClick={() => toggleEdit('password')}>✏️</button>
              </div>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>Guardar cambios</button>
        </div>

        <div className="logout-card">
          <img src="/logout.png" alt="Cerrar sesión" />
          <h4>Cerrar sesión</h4>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </Layout>
  );
}

export default Configuracion;
