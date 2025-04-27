const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // o tu usuario
  password: '',       // o tu contraseña si tienes
  database: 'usuarios_app'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

module.exports = db;
