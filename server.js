// server/server.js
const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Configura Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Asegúrate de descargar esto desde Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ia-1-motive-homecare.firebaseio.com' // Reemplaza con tu URL de Firebase
});

const db = admin.firestore();

// Rutas para agencias
app.get('/api/agencies', async (req, res) => {
  try {
    const agenciesRef = db.collection('agencies');
    const snapshot = await agenciesRef.get();
    const agencies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener agencias', error });
  }
});

app.post('/api/agencies', async (req, res) => {
  try {
    const newAgency = await db.collection('agencies').add(req.body);
    res.status(201).json({ id: newAgency.id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear agencia', error });
  }
});

// Similarmente, crea rutas para pacientes y referidos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));