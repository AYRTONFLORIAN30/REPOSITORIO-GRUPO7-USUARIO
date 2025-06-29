// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Schedules from './pages/Schedules';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import Horarios from './pages/Horarios';
import Calendario from './pages/Calendario';
import Configuracion from './pages/Configuracion';
import ImportarHorario from './pages/ImportarHorario';
import HorariosImportados from './pages/HorariosImportados';
import SincronizacionGoogle from './pages/SincronizacionGoogle';
import Callback from './pages/Callback';
import Reportes from './pages/Reportes';  // Importa el componente de Reportes

import { UserProvider } from './context/UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserProvider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/profile" element={<Profile />} />
            {/* Nuevas rutas */}
            <Route path="/sync" element={<SincronizacionGoogle />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/importar-horario" element={<ImportarHorario />} />
            <Route path="/horarios-importados" element={<HorariosImportados />} />
            <Route path="/reportes" element={<Reportes />} /> {/* Ruta para Reportes */}
          </Routes>
        </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
