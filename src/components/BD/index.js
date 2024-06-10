const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8081;

// Configurar conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'patrones'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ error: 'Error al obtener usuarios de la base de datos' });
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
