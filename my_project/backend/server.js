const express = require('express');
const cors = require('cors');
const app = express();

// Configuración del servidor
app.use(cors());
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
    res.send('Hola desde el servidor');
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
