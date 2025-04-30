import React from 'react';

function Settings() {
  return (
    <div className="container mt-5">
      <h2>Configuración de la Cuenta</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input type="email" id="email" className="form-control" placeholder="Correo electrónico" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" id="password" className="form-control" placeholder="Nueva contraseña" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default Settings;
