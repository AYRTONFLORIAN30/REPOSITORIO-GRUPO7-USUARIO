const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const { google } = require('googleapis');
const db = require('./db'); // ✅ conexión a MySQL
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

const clean = (value) => {
  return value?.trim().replace(/^,+/, '').replace(/^"|"$/g, '');
};

// 🔄 Convertir hora tipo "8:00am" o "1:30pm" a "08:00" o "13:30"
const convertirHora = (horaTexto) => {
  let [hora, meridiano] = horaTexto.toLowerCase().split(/(am|pm)/);
  let [h, m] = hora.trim().split(':').map(Number);
  if (meridiano === 'pm' && h !== 12) h += 12;
  if (meridiano === 'am' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// 📥 Ruta para subir y leer CSV
app.post('/upload-csv', upload.single('archivo'), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ',', skipLines: 0 }))
    .on('data', (row) => {
      const item = {
        Clase: clean(row['Clase']),
        Profesor: clean(row['Profesor']),
        Día: clean(row['Día'] || row['Dia']),
        Hora: clean(row['Hora']),
        Aula: clean(row['Aula']),
      };

      if (item.Clase && item.Profesor && item.Día && item.Hora && item.Aula) {
        results.push(item);
      }
    })
    .on('end', () => {
      fs.unlinkSync(filePath);
      res.json(results);
    })
    .on('error', (err) => {
      console.error('❌ Error al leer CSV:', err);
      res.status(500).send('Error al procesar el archivo CSV.');
    });
});

// 📅 Ruta para sincronizar con Google Calendar
app.post('/sync-calendar', async (req, res) => {
  const { token, eventos } = req.body;

  if (!token || !eventos || eventos.length === 0) {
    return res.status(400).send('Token o eventos faltantes');
  }

  try {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const meses = {
      enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06', 
      julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
    };

    // Array para almacenar las claves de eventos ya procesados
    const eventosExistentes = [];

    for (const evento of eventos) {
      const [horaInicioRaw, horaFinRaw] = evento.Hora.split('-');
      const horaInicio = convertirHora(horaInicioRaw);
      const horaFin = convertirHora(horaFinRaw);

      // Extraer el día, mes y año desde el CSV
      const diaMatch = evento.Día.match(/(\d+)/);
      const mesMatch = evento.Día.match(/(junio|julio)/i); // Asegurarse que el mes sea correcto
      const diaNumero = diaMatch ? diaMatch[0].padStart(2, '0') : '01';
      const mesNumero = meses[mesMatch ? mesMatch[0].toLowerCase() : 'junio'];

      const fecha = `2025-${mesNumero}-${diaNumero}`;

      // Crear una clave única para el evento (basado en la fecha y hora de inicio)
      const eventoClave = `${fecha}T${horaInicio}:00`;

      // Verificar si el evento ya fue sincronizado anteriormente en Google Calendar
      const response = await calendar.events.list({
        calendarId: 'primary',
        q: evento.Clase,  // Buscar eventos con el mismo nombre
        timeMin: `${fecha}T00:00:00Z`, // Buscar solo en el día específico
        timeMax: `${fecha}T23:59:59Z`,
      });

      // Si ya existe un evento con el mismo nombre en la misma fecha, mostrar un error
      if (response.data.items.length > 0) {
        return res.status(400).send("Este horario ya ha sido sincronizado con Google Calendar.");
      }

      // Si no está duplicado, agregar la clave al array de eventos
      eventosExistentes.push(eventoClave);

      const event = {
        summary: evento.Clase,
        description: `Profesor: ${evento.Profesor}\nAula: ${evento.Aula}`,
        start: {
          dateTime: `${fecha}T${horaInicio}:00`,
          timeZone: 'America/Lima',
        },
        end: {
          dateTime: `${fecha}T${horaFin}:00`,
          timeZone: 'America/Lima',
        },
      };

      console.log('📤 Insertando evento:', event);
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      });
    }

    res.status(200).send('Eventos sincronizados correctamente');
  } catch (error) {
    console.error('❌ Error al sincronizar:', error.message);
    res.status(500).send('Error al sincronizar eventos');
  }
});


// 🔧 Ruta para actualizar perfil real desde Google OAuth
app.put('/api/usuarios/:google_id', (req, res) => {
  const { google_id } = req.params;
  const { name, email, password } = req.body;

  const query = 'UPDATE usuarios SET name = ?, email = ?, password = ? WHERE google_id = ?';

  db.query(query, [name, email, password, google_id], (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  });
});

// Registro de usuario si no existe (desde Google Login)
app.post('/api/usuarios', (req, res) => {
  const { google_id, name, email } = req.body;

  const checkQuery = 'SELECT * FROM usuarios WHERE google_id = ?';
  const insertQuery = 'INSERT INTO usuarios (google_id, name, email) VALUES (?, ?, ?)';

  db.query(checkQuery, [google_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la verificación' });

    if (results.length === 0) {
      db.query(insertQuery, [google_id, name, email], (insertErr) => {
        if (insertErr) return res.status(500).json({ error: 'Error al insertar usuario' });
        res.status(201).json({ message: 'Usuario registrado' });
      });
    } else {
      res.status(200).json({ message: 'Usuario ya registrado' });
    }
  });
});

app.post('/api/sincronizaciones', (req, res) => {
  const { usuario_id, exito } = req.body;

  if (!usuario_id || typeof exito === 'undefined') {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const query = 'INSERT INTO sincronizaciones (usuario_id, exito) VALUES (?, ?)';

  db.query(query, [usuario_id, exito], (err, result) => {
    if (err) {
      console.error('❌ Error al registrar sincronización:', err);
      return res.status(500).json({ error: 'Error al registrar' });
    }

    res.status(201).json({ message: 'Sincronización registrada' });
  });
});

app.get('/api/sincronizaciones/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const query = `
    SELECT fecha, exito
    FROM sincronizaciones
    WHERE usuario_id = ?
    ORDER BY fecha DESC
    LIMIT 10
  `;

  db.query(query, [usuario_id], (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener historial:', err);
      return res.status(500).json({ error: 'Error en consulta' });
    }

    res.json(rows);
  });
});



// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
