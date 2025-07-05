const mysql = require('mysql');
require('dotenv').config(); // Asegúrate de cargar .env aquí si aún no lo haces en index.js

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'host.docker.internal', // Usará 'host.docker.internal' en Docker
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'usuarios_app'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

module.exports = db;