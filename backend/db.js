require('dotenv').config(); // Asegúrate de que esta línea esté incluida

const mysql = require('mysql');
require('dotenv').config(); // Asegúrate de cargar .env aquí si aún no lo haces en index.js

const db = mysql.createConnection({
<<<<<<< HEAD
  host: process.env.DB_HOST || 'host.docker.internal', // Usará 'host.docker.internal' en Docker
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'usuarios_app'
=======
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // puerto por defecto para MySQL
>>>>>>> b73f9a20746ad060dfd1b96eb45c75a1d0c5da15
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

module.exports = db;