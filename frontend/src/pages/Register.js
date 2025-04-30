import React from 'react';

function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre completo</label>
            <input type="text" id="name" className="form-control" placeholder="Nombre completo" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" id="email" className="form-control" placeholder="Correo electrónico" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" id="password" className="form-control" placeholder="Contraseña" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Registrarse</button>
        </form>
        <p className="text-center">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
