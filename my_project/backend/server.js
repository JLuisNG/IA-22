const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuración del servidor
app.use(cors());
app.use(express.json());

// Configurar Express para servir archivos estáticos desde la carpeta frontend
// Subimos un nivel desde backend para acceder a frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Ruta para el index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
  console.log('Intentando servir:', indexPath);
  res.sendFile(indexPath);
});

// Ruta de prueba
app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente');
});

// Definir puerto y iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Accede a http://localhost:${PORT}`);
});


